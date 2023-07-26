import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Personality } from "@prisma/client";

export const employeeRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.employee.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.employee.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        jobPosition: z.string(),
        personality: z.nativeEnum(Personality),
        picUrl: z.string().optional(),
        bio: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.employee.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          jobPosition: input.jobPosition,
          personality: input.personality,
          ...(input.bio && { bio: input.bio }),
          ...(input.picUrl && { picUrl: input.picUrl }),
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        jobPosition: z.string().optional(),
        personality: z.nativeEnum(Personality).optional(),
        picUrl: z.string().optional(),
        bio: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.employee.update({
        where: {
          id: input.id,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          jobPosition: input.jobPosition,
          personality: input.personality,
          ...(input.bio && { bio: input.bio }),
          ...(input.picUrl && { picUrl: input.picUrl }),
          userId: ctx.session.user.id,
        },
      });
    }),
});
