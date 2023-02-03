import { createGuild } from "../services/guildService";
import type { Context } from '../trpc/context';

export const createGuildHandler = async ({ input, ctx }: { input: CreateGuildInput; ctx: Context }) => {
    try {
        const user = await ctx.session?.user;
        const guild = await createGuild({
            name: input.name,
            primaryColor: input.primaryColor,
            secondaryColor: input.secondaryColor,
            badge: input.badge,
            user: {
                connect: {
                    id: user?.id
                }
            },
            municipality: {
                connect: {
                    id: "0"
                }
            }
        });

        return {
            status: 'success',
            data: {
                guild
            }
        }
    }
    catch (err: any) {
        throw err;
    }
};

export type CreateGuildInput = {
    name: string;
    primaryColor: string;
    secondaryColor: string;
    badge: number;
}