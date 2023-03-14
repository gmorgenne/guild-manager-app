import type { Context } from '../trpc/context';
import { AddHeroToParty, CreateParty } from '../services/partyService';
import type { CreatePartyInput } from '../../types/party';

export const createPartyHandler = async ({ input }: { input: CreatePartyInput; ctx: Context}) => {
    try {
        const party = await createParty(input);
        input.heroIds.forEach((id) => {
            AddHeroToParty({ heroId: id, partyId: party.id });
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
};

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
};