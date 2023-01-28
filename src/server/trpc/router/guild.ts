import { createGuildHandler } from "../../controllers/guildController";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const guildRouter = router({
  createGuild: protectedProcedure
    .input(z.object({
      name: z.string(),
      primaryColor: z.string(),
      secondaryColor: z.string(),
      badge: z.number()
    }))
    .mutation(({ input, ctx }) => createGuildHandler({ input, ctx })),
  getGuildById: publicProcedure
    .input(z.object({ id: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
        return ctx.prisma.guild.findFirst({
            where: {
                id: {
                    equals: input?.id ?? ""
                }
            }
        });
    }),
  getUserGuild: publicProcedure
    .input(z.object({ userId: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
        return ctx.prisma.guild.findFirst({
            where: {
                userId: {
                    equals: input?.userId ?? ""
                }
            }
        });
    }),
  getUserGuilds: publicProcedure
    .input(z.object({ userId: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
        return ctx.prisma.guild.findMany({
            where: {
                userId: {
                    equals: input?.userId ?? ""
                }
            }
        });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.guild.findMany();
  })
});
