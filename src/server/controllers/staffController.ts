import type { AddStaffToGuildInput } from '../../types/staff';
import { AddStaffToGuild } from '../services/staffService';
import type { Context } from '../trpc/context';

export const addStaffToGuildHandler = async ({ input }: { input: AddStaffToGuildInput, ctx: Context }) => {
    try {
        const staff = AddStaffToGuild(input);

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