import { z } from "zod";
import { router, publicProcedure } from "../trpc";


export const questRouter = router({
    getAll: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.quest.findMany();
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
