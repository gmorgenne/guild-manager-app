import { prisma } from './../db/client';
import type { Prisma } from '@prisma/client';
import type { AddHeroToPartyInput, AssignPartyToQuestInput, RenamePartyInput } from '../../types/party';

export const AddHeroToParty = async (input: AddHeroToPartyInput) => {
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
export const AssignPartyToQuest = async (input: AssignPartyToQuestInput) => {
    const updatedParty = await prisma?.party.update({
        where: {
            id: input.partyId
        },
        data: {
            quest: {
                connect: {
                    id: input.questId
                }
            }
        }
    });

    return {
        party: updatedParty
    }
};
export const CreateParty = async (input: Prisma.PartyCreateInput) => {
    return (await prisma?.party.create({
        data: input
    }));
};
export const RenameParty = async (input: RenamePartyInput) => {
    return (await prisma?.party.update({
        where: {
            id: input.id
        },
        data: {
            name: input.name
        }
    }));
};