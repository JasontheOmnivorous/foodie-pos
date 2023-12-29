import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // auth guard
  const session = await getServerSession(req, res, authOptions); // session will be null if the user didn't log in

  if (!session) return res.status(401).send("Unauthorized.");

  const user = session.user;
  // check if the user exists in the database
  const dbUser = await prisma.user.findUnique({
    where: { email: user?.email as string },
  });

  // if user doesn't exist in database, add him and create some dummy data
  if (!dbUser) {
    // 1. create company
    // after new user's created, create example default data for the user to blend in easily
    const newCompanyName = "Default Company";
    const newCompanyAddress = "Default Company Address";
    const newCompany = await prisma.company.create({
      data: { name: newCompanyName, address: newCompanyAddress },
    });

    // 2. create user
    await prisma.user.create({
      data: {
        name: user?.name,
        email: user?.email as string,
        companyId: newCompany.id,
      },
    });

    // 3. create menu category
    const newMenuCategoryName = "Default Menu Category";
    const newMenuCategory = await prisma.menuCategory.create({
      data: { name: newMenuCategoryName, companyId: newCompany.id },
    });

    // 4. create menu
    const newMenuName = "Carbonara";
    const newMenu = await prisma.menu.create({
      data: { name: newMenuName, price: 1000 },
    });

    // 5. populate MenuCategoryMenu join table
    const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({
      data: { menuCategoryId: newMenuCategory.id, menuId: newMenu.id },
    });

    // 6. create addon category
    const newAddonCategoryName = "Default Addon Category";
    const newAddonCategory = await prisma.addonCategory.create({
      data: { name: newAddonCategoryName },
    });

    // 7. populate MenuAddonCategory join table
    const newMenuAddonCategory = await prisma.menuAddonCategory.create({
      data: { menuId: newMenu.id, addonCategoryId: newAddonCategory.id },
    });

    // 8. create addons
    const newAddonName = "Default Addon";
    const newAddonNameTwo = "Default Addon Two";
    const newAddonNameThree = "Default Addon Three";

    // define necessary data with an array to use with transaction
    const newAddonData = [
      {
        name: newAddonName,
        addonCategoryId: newAddonCategory.id,
      },
      {
        name: newAddonNameTwo,
        addonCategoryId: newAddonCategory.id,
      },
      {
        name: newAddonNameThree,
        addonCategoryId: newAddonCategory.id,
      },
    ];

    // create many addons in a batch using $transaction
    const newAddons = await prisma.$transaction(
      newAddonData.map((addon) => prisma.addon.create({ data: addon }))
    );

    // 9. create location
    const newLocationName = "Sanchaung";
    const newLocation = await prisma.location.create({
      data: {
        name: newLocationName,
        address: "Default Company Address",
        companyId: newCompany.id,
      },
    });

    res.status(200).json({
      newLocation,
      newMenuCategory,
      newMenu,
      newMenuCategoryMenu,
      newAddonCategory,
      newMenuAddonCategory,
      newAddons,
    });
  } else {
    // if the user exists in the database, response his data
    const company = await prisma.company.findFirst({
      where: { id: dbUser.companyId },
    });

    const locations = await prisma.location.findMany({
      where: { companyId: company?.id },
    });

    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: company?.id },
    });

    const menuCategoryIds = menuCategories.map((item) => item.id); // extract menuCategory ids

    // in operator used for extracting multiple results of a query
    // menuCategory id 1 may have many menu ids
    const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    });

    const menuIds = menuCategoryMenu.map((item) => item.menuId);

    // find menus using menuIds
    const menus = await prisma.menu.findMany({
      where: { id: { in: menuIds } },
    });

    const menuAddonCategory = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menuIds } },
    });

    const addonCategoryIds = menuAddonCategory.map(
      (item) => item.addonCategoryId
    );

    const addonCategories = await prisma.addonCategory.findMany({
      where: { id: { in: addonCategoryIds } },
    });

    const addons = await prisma.addon.findMany({
      where: { id: { in: addonCategoryIds } },
    });

    return res.status(200).json({
      locations,
      menuCategories,
      menus,
      addonCategories,
      addons,
    });
  }

  return res.status(200).json(user);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await getHandler(req, res);
  } else {
    res.status(405).send("Method not defined.");
  }
};

export default handler;
