import { createPartyHandler, renamePartyHandler } from "../../controllers/partyController";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const partyRouter = router({
    createParty: protectedProcedure
        .input(z.object({
            compatibility: z.number(),
            guild: z.string(),
            heroIds: z.array(z.string()),
            name: z.string(),
            quest: z.string().nullable().optional()
        }))
        .mutation(({ input, ctx }) => createPartyHandler({ input, ctx })),
    getPartiesByGuildId: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.party.findMany({
                where: {
                    guildId: {
                        equals: input?.id
                    }
                }
            })
        }),
    getPartyQuest: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.quest.findFirst({
                where: {
                    id: {
                        equals: input?.id
                    }
                }
            })
        }),
    getAll: publicProcedure.query(({ ctx }) => {
            return ctx.prisma.party.findMany();
        }),
    renameParty: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string()
        }))
        .mutation(({ input, ctx }) => renamePartyHandler({ input, ctx }))
});
