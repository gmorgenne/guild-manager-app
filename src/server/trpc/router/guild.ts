import type { Context } from './../context';
import { protectedProcedure } from './../trpc';

import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import type { Prisma } from '@prisma/client';

export const guildRouter = router({
  createGuild: protectedProcedure
    .input(z.object({
      name: z.string(),
      primaryColor: z.string(),
      secondaryColor: z.string(),
      badge: z.number()
    }))
    .mutation(({ input, ctx }) => createGuildHandler({ input, ctx })),
  getUserGuild: publicProcedure
    .input(z.object({ userId: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
        return ctx.prisma.guild.findFirst({
            where: {
                userId: {
                    equals: input?.userId ?? ""
                }
            }
        });
    }),
  getUserGuilds: publicProcedure
    .input(z.object({ userId: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
        return ctx.prisma.guild.findMany({
            where: {
                userId: {
                    equals: input?.userId ?? ""
                }
            }
        });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.guild.findMany();
  })
});

const createGuildHandler = async ({ input, ctx }: { input: CreateGuildInput; ctx: Context }) => {
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

const createGuild = async (input: Prisma.GuildCreateInput) => {
  return (await prisma?.guild.create({
    data: input
  }));
}

export type CreateGuildInput = {
  name:            string;
  primaryColor:    string;
  secondaryColor:  string;
  badge:           number;
}