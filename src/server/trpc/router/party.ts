import { prisma } from './../../db/client';
import type { Context } from './../context';
import { router, publicProcedure, protectedProcedure } from "../trpc";
import type { Party, Prisma } from '@prisma/client';
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

// controller stuff
const createPartyHandler = async ({ input }: { input: CreatePartyInput; ctx: Context}) => {
    try {
        const party = await createParty(input);
        input.heroIds.forEach((id) => {
            AddHeroToParty({ heroId: id, partyId: party.id });
        })


        return {
            status: 'success',
            data: {
                party
            }
        }
    }
    catch (err: any) {
        throw err;
      }
}
const renamePartyHandler = async ({ input }: { input: RenamePartyInput; ctx: Context }) => {
    try {
        const party = await RenameParty({
            id: input.id,
            name: input.name
        });

        return {
            status: 'success',
            data: {
                party
            }
        }
    }
    catch (err: any) {
        throw err;
      }
}
// controller privates :p lolz
const createParty = async (input: CreatePartyInput) => {
    if (input.quest) {
        return await CreateParty({
            compatibility: input.compatibility,
            name: input.name,
            guild: {
                connect: {
                    id: input.guild
                }
            },
            quest: {
                connect: {
                    id: input.quest
                }
            }
        });
    }
    return await CreateParty({
        compatibility: input.compatibility,
        name: input.name,
        guild: {
            connect: {
                id: input.guild
            }
        }
    });
}

// service stuff
const AddHeroToParty = async (input: AddHeroToPartyInput) => {
    const updatedHero = await prisma?.hero.update({
      where: {
        id: input.heroId
      },
      data: {
        party: {
          connect: {
            id: input.partyId
          }
        }
      }
    });
  
    return {
      hero: updatedHero
    }
  };
const CreateParty = async (input: Prisma.PartyCreateInput) => {
    return (await prisma?.party.create({
        data: input
    }));
}
const RenameParty = async (input: RenamePartyInput) => {
    return (await prisma?.party.update({
        where: {
            id: input.id
        },
        data: {
            name: input.name
        }
    }));
}

// types
export type AddHeroToPartyInput = {
    heroId: string;
    partyId: string;
  };
export type CreatePartyInput = {
    compatibility: number;
    guild: string;
    heroIds: string[];
    name: string;
    quest?: string | null | undefined;
}
export type RenamePartyInput = {
    id: string;
    name: string;
}