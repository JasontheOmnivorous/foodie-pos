import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).send("Unauthorized.");

  const user = session.user;
  const dbUser = await prisma.user.findUnique({
    where: { email: user?.email as string },
  });

  if (!dbUser) return res.status(401).send("Unauthorized.");

  const { name, address } = req.body;

  if (!name || !address)
    return res.status(400).send("Name or Address missing.");

  const newLocation = await prisma.location.create({
    data: { name, address, companyId: dbUser.companyId },
  });

  if (!newLocation) return res.status(500).send("Fail to create new location.");

  return res.status(201).json(newLocation);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await postHandler(req, res);
  }

  res.status(405).send("Invalid method.");
};

export default handler;
