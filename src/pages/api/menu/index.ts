import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).send("Unauthorized!");

  const { name, price, menuCategoryIds } = req.body;

  if (!name || !price || menuCategoryIds.length <= 0)
    return res.status(400).send("Please provide necessary data.");

  const newMenu = await prisma.menu.create({ data: { name, price } });

  menuCategoryIds.map(async (item: number) => {
    await prisma.menuCategoryMenu.create({
      data: { menuId: newMenu.id, menuCategoryId: item },
    });
  });

  return res.status(201).json(newMenu);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await postHandler(req, res);
  }

  res.status(400).send("Invalid method.");
};

export default handler;
