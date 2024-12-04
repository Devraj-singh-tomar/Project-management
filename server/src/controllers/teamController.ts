import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all users ---------
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const ProductOwner = await prisma.user.findUnique({
          where: {
            userId: team.productOwnerUserId!,
          },
          select: {
            username: true,
          },
        });

        const projectManager = await prisma.user.findUnique({
          where: {
            userId: team.projectManagerUserId!,
          },
          select: {
            username: true,
          },
        });

        return {
          ...team,
          productOwnerUsername: ProductOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );
    res.json(teamsWithUsernames);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving teams ${error.message}` });
  }
};
