import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { employeeSchema } from "@/utils/schema";

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
    .input(employeeSchema)
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
      employeeSchema.partial().extend({
        id: z.string(),
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
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.employee.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
