import { z } from "zod";
import { createQuestHandler } from "../../controllers/questController";
import { router, publicProcedure, protectedProcedure } from "../trpc";


export const questRouter = router({
  generateQuest: protectedProcedure
    .input(z.string().nullish())
    .query(({ input }) => { createQuestHandler(input) }),
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.quest.findMany({
        where: { NOT: {id: { equals: "0" } }}, // exclude training quests
        include: { municipality: true }
      });
    }),
  getQuest: publicProcedure
    .input(z.object({ id: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return ctx.prisma.quest.findFirst({
        where: {
          id: {
            equals: input?.id ?? ""
          }
        },
        include: {
          municipality: true,
          encounters: true
        }
      })
    }),
  getQuestsByMunicipality: publicProcedure
    .input(z.object({ id: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return ctx.prisma.quest.findMany({
        where: {
          municipalityId: {
            equals: input?.id ?? "0"
          }
        },
        include: {
          municipality: true
        }
      })
    })
});
