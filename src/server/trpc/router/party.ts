import { createPartyHandler } from "../../controllers/partyController";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const partyRouter = router({
    assignPartyToQuest: protectedProcedure
        .input(z.object({
            partyId: z.string(),
            questId: z.string().optional()
        }))
        .mutation(({ input, ctx }) => {
            if (input.questId) {
                return ctx.prisma.party.update({
                    where: {
                        id: input.partyId
                    },
                    data: {
                        quest: {
                            connect: {
                                id: input.questId || undefined
                            }
                        }
                    }
                });
            } else {
                return ctx.prisma.party.update({
                    where: {
                        id: input.partyId
                    },
                    data: {
                        quest: {
                            disconnect: true
                        }
                    }
                });
            }
        }),
    createParty: protectedProcedure
        .input(z.object({
            compatibility: z.number(),
            guild: z.string(),
            heroIds: z.array(z.string()),
            name: z.string(),
            quest: z.string().nullable().optional()
        }))
        .mutation(({ input, ctx }) => createPartyHandler({ input, ctx })),
    getAvailablePartiesByGuildId: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.party.findMany({
                where: {
                    guildId: {
                        equals: input?.id
                    },
                    questId: {
                        equals: null
                    }
                },
                include: {
                    heroes: true
                }
            })
        }),
    getPartiesByGuildId: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.party.findMany({
                where: {
                    guildId: {
                        equals: input?.id
                    }
                },
                include: {
                    heroes: true
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
        .mutation(({ input, ctx }) => {
            const updated = ctx.prisma.party.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name
                }
            });
            updated.then((data) => { return { data: data}});
        })
});
