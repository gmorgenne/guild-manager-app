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
    deleteParty: protectedProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            const heroes = await ctx.prisma.hero.findMany({
                where: {
                   partyId: input
                }
            });
            heroes.map((hero) => {
                ctx.prisma.hero.update({
                    where: {
                        id: hero.id
                    },
                    data: {
                        party: {
                            disconnect: true
                        }
                    }
                });
            });
            return await ctx.prisma.party.delete({
                where: {
                    id: input
                }
            });
        }),
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
                    heroes: true,
                    quest: true
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
        .mutation(async ({ input, ctx }) => {
            const updated = await ctx.prisma.party.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name
                }
            });
            return { data: updated }
        }),
    updateParty: protectedProcedure
        .input(z.object({
            addHeroIds: z.array(z.string()),
            compatibility: z.number(),
            id: z.string(),
            removeHeroIds: z.array(z.string()),
        }))
        .mutation(async ({ input, ctx }) => {
            const addedHeroes: string[] = [];
            input.addHeroIds.map(async (id) => {
                const added = await ctx.prisma.hero.update({
                    where: {
                        id: id
                    },
                    data: {
                        party: {
                            connect: {
                                id: input.id
                            }
                        }
                    }
                });
                if (added) {
                    addedHeroes.push(added.id);
                }
            });
            const removedHeroes: string[] = [];
            input.removeHeroIds.map(async (id) => {
                const removed = await ctx.prisma.hero.update({
                    where: {
                        id: id
                    },
                    data: {
                        party: {
                            disconnect: true
                        }
                    }
                });
                if (removed) {
                    removedHeroes.push(removed.id);
                }
            });
            const update = await ctx.prisma.party.update({
                where: {
                    id: input.id
                },
                data: {
                    compatibility: input.compatibility
                }
            });
            return {
                added: addedHeroes,
                data: update,
                removed: removedHeroes
            }
        })
});
