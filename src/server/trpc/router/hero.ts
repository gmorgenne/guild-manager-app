import { addHeroToGuildHandler, createHeroHandler, generateHeroHandler, removeHeroFromGuildHandler } from "../../controllers/heroController";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const heroRouter = router({
  addHero: protectedProcedure
    .input(z.object({
      guildId: z.string(),
      heroId: z.string()
    }))
    .mutation(({ input, ctx }) => addHeroToGuildHandler({ input, ctx })),
  createHero: protectedProcedure
    .input(z.object({
      name: z.string(),
      sex: z.boolean(),
      race: z.string(),
      class: z.string(),
      alignment: z.string(),
      healthPoints: z.number(),
      strength: z.number(),
      dexterity: z.number(),
      magic: z.number(),
      constitution: z.number(),
      resistance: z.number(),
      defense: z.number(),
      movement: z.number(),
      speed: z.number(),
      purse: z.number(),
      guild: z.string()
    }))
    .mutation(({ input, ctx }) => createHeroHandler({ input, ctx })),
  generateHero: protectedProcedure
    .query(() => { generateHeroHandler() }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.hero.findMany();
  }),
  getHero: publicProcedure
    .input(z.object({ id: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return ctx.prisma.hero.findFirst({
        where: {
          id: {
            equals: input?.id ?? ""
          }
        }
      })
    }),
  getHeroesByGuild: protectedProcedure
    .input(z.object({ id: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return ctx.prisma.hero.findMany({
        where: {
          guildId: {
            equals: input?.id ?? "0"
          }
        }
      })
    }),
  getHeroesByPartyId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.hero.findMany({
        where: {
          partyId: {
            equals: input?.id
          }
        }
      })
    }),
  removeHeroFromGuild: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => removeHeroFromGuildHandler({ input, ctx })),
});
