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
  const userExists = await prisma.user.findUnique({
    where: { email: user?.email as string },
  });

  // if user doesn't exist in database, add him
  if (!userExists) {
    const newUser = await prisma.user.create({
      data: { name: user?.name, email: user?.email as string },
    });
    return res.status(200).json(newUser);
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
