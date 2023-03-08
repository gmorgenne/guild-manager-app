import { Alignments } from './../../../types/alignments';
import { z } from "zod";
import { Classes } from "../../../types/classes";
import { addHeroToGuildHandler, createHeroHandler, generateHeroHandler, removeHeroFromGuildHandler } from "../../controllers/heroController";
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
      subclass: z.string(),
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
    .input(z.object({ 
      id: z.string(),
      classes: z.array(z.string()).nullish(),
      alignments: z.array(z.string()).nullish()
    }))
    .query(({ input, ctx }) => {
      return ctx.prisma.hero.findMany({
        where: {
          guildId: {
            equals: input?.id ?? "0"
          },
          class: {
            in: input?.classes && input?.classes?.length > 0 ? input?.classes : Classes
          },
          alignment: {
            in: input?.alignments && input?.alignments?.length > 0 ? input?.alignments : Alignments
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
