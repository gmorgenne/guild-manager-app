import type { Context } from '../trpc/context';
import { AddHeroToParty, AssignPartyToQuest, CreateParty, RenameParty } from '../services/partyService';
import type { AssignPartyToQuestInput, CreatePartyInput, RenamePartyInput } from '../../types/party';

export const assignPartyToQuestHandler = async ({ input }: { input: AssignPartyToQuestInput; ctx: Context}) => {
    try {
        const party = await AssignPartyToQuest(input);

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
export const createPartyHandler = async ({ input }: { input: CreatePartyInput; ctx: Context}) => {
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
export const renamePartyHandler = async ({ input }: { input: RenamePartyInput; ctx: Context }) => {
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

// privates :p lolz
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