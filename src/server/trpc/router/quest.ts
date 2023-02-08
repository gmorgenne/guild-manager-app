import { z } from "zod";
import { createQuestHandler } from "../../controllers/questController";
import { router, publicProcedure, protectedProcedure } from "../trpc";


export const questRouter = router({
  generateQuest: protectedProcedure
    .query(() => { createQuestHandler() }),
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.quest.findMany({ include: { municipality: true } });
    }),
  getQuest: publicProcedure
    .input(z.object({ id: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return ctx.prisma.quest.findFirst({
      where: {
        id: {
        equals: input?.id ?? ""
        }
      }
      })
    }),
});
