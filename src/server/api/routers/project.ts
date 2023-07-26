import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { projectSchema } from "@/utils/schema";

export const projectRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          candidates: true,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        candidates: true,
      },
    });
  }),
  create: protectedProcedure.input(projectSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.project.create({
      data: {
        title: input.title,
        teamSize: input.teamSize,
        ...(input.startDate && { startDate: input.startDate }),
        ...(input.endDate && { endDate: input.endDate }),
        candidates: {
          connect: input.candidateIds.map((candidateId) => ({
            id: candidateId,
          })),
        },
        userId: ctx.session.user.id,
      },
    });
  }),
});
