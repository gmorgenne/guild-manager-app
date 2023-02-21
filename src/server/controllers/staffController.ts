import { AddStaffToGuild, CreateStaff, GenerateStaff, RemoveStaffFromGuild } from '../services/staffService';
import type { Context } from '../trpc/context';
import type { AddStaffToGuildInput, CreateStaffInput } from '../../types/staff';

export const addStaffToGuildHandler = async ({ input }: { input: AddStaffToGuildInput, ctx: Context }) => {
    try {
        const staff = AddStaffToGuild(input);
        generateStaffHandler();
        return {
            status: 'success',
            data: {
                staff
            }
        }
    }
    catch (err: any) {
        throw (err);
    }
}
export const createStaffHandler = async ({ input }: { input: CreateStaffInput; ctx: Context }) => {
    try {
        const staff = await CreateStaff({
            name: input.name,
            sex: input.sex,
            level: 0,
            experience: 0,
            race: input.race,
            jobClass: input.jobClass,
            guild: {
                connect: {
                    id: "0"
                }
            },
            contractExpiration: "9999-01-01T00:00:00Z"
        });

        return {
            status: 'success',
            data: {
                staff
            }
        }
    }
    catch (err: any) {
        throw err;
    }
};
export const generateStaffHandler = async () => {
    try {
        const staffInput = await GenerateStaff();
        const staff = await CreateStaff(staffInput);

        return {
            status: 'success',
            data: {
                staff
            }
        }
    }
    catch (err: any) {
        throw err;
    }
};
export const removeStaffFromGuildHandler = async ({ input }: { input: string; ctx: Context }) => {
    try {
        const hero = RemoveStaffFromGuild(input);

        return {
            status: 'success',
            data: {
                hero
            }
        }
    } catch (err: any) {
        throw err;
    }
};