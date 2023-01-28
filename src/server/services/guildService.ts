import { prisma } from './../db/client';
import type { Prisma } from '@prisma/client';

export const createGuild = async (input: Prisma.GuildCreateInput) => {
    return (await prisma?.guild.create({
        data: input
    }));
}