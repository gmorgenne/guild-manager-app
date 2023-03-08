import type { Context } from '../trpc/context';
import { AddStaffToCrew, CreateCrew } from '../services/crewService';
import type { CreateCrewInput } from '../../types/crew';

export const createCrewHandler = async ({ input }: { input: CreateCrewInput; ctx: Context}) => {
    try {
        const crew = await createCrew(input);
        input.staffIds.forEach((id) => {
            AddStaffToCrew({ staffId: id, crewId: crew.id });
        })


        return {
            status: 'success',
            data: {
                crew
            }
        }
    }
    catch (err: any) {
        throw err;
      }
}

const createCrew = async (input: CreateCrewInput) => {
    return await CreateCrew({
        name: input.name,
        guild: {
            connect: {
                id: input.guild
            }
        }
    });
}