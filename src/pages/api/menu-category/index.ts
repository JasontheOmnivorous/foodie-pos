import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).send("Unauthorized.");

  const { name, locationId } = req.body;

  if (!name || !locationId)
    return res.status(405).send("Name or Location Id is missing.");

  const location = await prisma.location.findFirst({
    where: { id: locationId },
  });

  if (!location) return res.status(400).send("Location not found.");

  const company = await prisma.company.findFirst({
    where: { id: location?.companyId },
  });

  if (!company) return res.status(400).send("Company not found.");

  const menuCategory = await prisma.menuCategory.create({
    data: { name, companyId: company.id },
  });

  return res.status(201).json(menuCategory);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await postHandler(req, res);
  } else {
    res.status(405).send("Invalid Method.");
  }
};

export default handler;
