import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).send("Unauthorized!");

  const { name, price, menuCategoryIds } = req.body;

  if (!name || !price || menuCategoryIds.length <= 0)
    return res.status(400).send("Please provide all the necessary data.");

  const newMenu = await prisma.menu.create({ data: { name, price } });

  menuCategoryIds.map(async (item: number) => {
    await prisma.menuCategoryMenu.create({
      data: { menuId: newMenu.id, menuCategoryId: item },
    });
  });

  return res.status(201).json(newMenu);
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, price, menuCategoryIds } = req.body;

  if (!id || !name || !price || menuCategoryIds.length <= 0) {
    return res.status(400).send("Please provide all the necessary data.");
  }

  // update menu where the id is requested id
  const menu = await prisma.menu.update({
    data: {
      name,
      price,
    },
    where: { id },
  });

  // delete menuCategoryMenu rows where menuId is requested id, in case we have to change them
  // we dont need to worry about client not changing menuCategory
  // because it's just delete and re-populate
  await prisma.menuCategoryMenu.deleteMany({ where: { menuId: id } });

  // create menuCategoryMenus out of data we have
  const generateMenuCategoryMenus = menuCategoryIds.map((item: number) => ({
    menuId: id,
    menuCategoryId: item,
  }));

  // update the database with updated menuCategoryMenus using transaction
  const menuCategoryMenus = await prisma.$transaction(
    generateMenuCategoryMenus.map(
      (item: { menuId: number; menuCategoryId: number }) => {
        return prisma.menuCategoryMenu.create({
          data: { menuId: item.menuId, menuCategoryId: item.menuCategoryId },
        });
      }
    )
  );

  // respond updated menu and changed menuCategoryMenu
  return res.status(200).json({ menu, menuCategoryMenus });
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const menuId = Number(req.query.id);

  await prisma.menu.update({
    data: { isArchived: true },
    where: { id: menuId },
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await postHandler(req, res);
  } else if (req.method === "PUT") {
    await putHandler(req, res);
  } else if (req.method === "DELETE") {
    await deleteHandler(req, res);
  }

  res.status(400).send("Invalid method.");
};

export default handler;
