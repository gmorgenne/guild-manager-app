import type { Context } from './../context';
import { protectedProcedure } from './../trpc';

import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import type { Prisma } from '@prisma/client';

export const heroRouter = router({
  addHero: protectedProcedure
    .input(z.object({
      guildId: z.string(),
      heroId: z.string()
    }))
    .mutation(({ input, ctx }) => addHeroToGuildHandler({ input, ctx })),
  createHero: protectedProcedure
    .input(z.object({
      name: z.string(),
      sex: z.boolean(),
      race: z.string(),
      class: z.string(),
      alignment: z.string(),
      healthPoints: z.number(),
      strength: z.number(),
      dexterity: z.number(),
      magic: z.number(),
      constitution: z.number(),
      resistance: z.number(),
      defense: z.number(),
      movement: z.number(),
      speed: z.number(),
      purse: z.number()
    }))
    .mutation(({ input, ctx }) => createHeroHandler({ input, ctx })),
  getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.hero.findMany();
    }),
  getHero: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.hero.findFirst({
        where: {
          id: {
            equals: input.id
          }
        }
      })
    }),
  getHeroesByGuild: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.hero.findMany({
        where: {
          guildId: {
            equals: input.id
          }
        }
      })
    }),
  removeHeroFromGuild: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => removeHeroFromGuildHandler({ input, ctx })),
});

// controller stuff
const addHeroToGuildHandler = async ({ input }: { input: AddHeroToGuildInput, ctx: Context} ) => {
  try {
    const hero = AddHeroToGuild(input);

    return {
      status: 'success',
      data: {
        hero
      }
    }
  }
  catch (err: any) {
    throw(err);
  }
}
const createHeroHandler = async ({ input }: { input: CreateHeroInput; ctx: Context }) => {
  try {
    const hero = await createHero({
      name: input.name,
      sex: input.sex,
      level: 0,
      experience: 0,
      race: input.race,
      class: input.class,
      alignment: input.alignment,
      healthPoints: input.healthPoints,
      strength: input.strength,
      dexterity: input.dexterity,
      magic: input.magic,
      constitution: input.constitution,
      resistance: input.resistance,
      defense: input.defense,
      movement: input.movement,
      speed: input.speed,
      purse: input.purse
    });

    return {
      status: 'success',
      data: {
        hero
      }
    }
  }
  catch (err: any) {
    throw err;
  }
};
const removeHeroFromGuildHandler = async ({ input }: { input: string; ctx: Context }) => {
  try {
    const hero = removeHeroFromGuild(input);

    return {
      status: 'success',
      data: {
        hero
      }
    }
  } catch (err: any) {
    throw err;
  }
}

// service stuff
const AddHeroToGuild = async (input: AddHeroToGuildInput) => {
  const hero = await prisma?.hero.update({
    where: {
      id: input.heroId
    },
    data: {
      guild: {
        connect: {
          id: input.guildId
        }
      }
    }
  })
}
const createHero = async (input: Prisma.HeroCreateInput) => {
  return (await prisma?.hero.create({
    data: input
  }));
}
const removeHeroFromGuild = async (input: string) => {
  const hero = await prisma?.hero.update({
    where: {
      id: input
    },
    data: {
      guildId: "0"
    }
  });
  return hero;
}


// types
export type AddHeroToGuildInput = {
  guildId: string;
  heroId: string;
}
export type CreateHeroInput = {
  name: string;
  sex: boolean;
  race: string;
  class: string;
  alignment: string;
  healthPoints: number;
  strength: number;
  dexterity: number;
  magic: number;
  constitution: number;
  resistance: number;
  defense: number;
  movement: number;
  speed: number;
  purse: number;
}