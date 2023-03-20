import { AddHeroToGuild, CreateHero, GenerateHero, RemoveHeroFromGuild } from '../services/heroService';
import type { Hero } from '@prisma/client';
import type { Context } from '../trpc/context';
import type { AddHeroToGuildInput, CreateHeroInput } from '../../types/hero';

export const addHeroToGuildHandler = async ({ input }: { input: AddHeroToGuildInput, ctx: Context }) => {
    try {
        const hero = AddHeroToGuild(input);
        generateHeroHandler();
        return {
            status: 'success',
            data: {
                hero
            }
        }
    }
    catch (err: any) {
        throw (err);
    }
};
export const createHeroHandler = async ({ input }: { input: CreateHeroInput; ctx: Context }) => {
    try {
        const hero = await CreateHero({
            name: input.name,
            sex: input.sex,
            level: 0,
            experience: 0,
            race: input.race,
            class: input.class,
            subclass: input.subclass,
            alignment: input.alignment,
            healthPoints: input.healthPoints,
            maxHealthPoints: input.healthPoints,
            strength: input.strength,
            dexterity: input.dexterity,
            magic: input.magic,
            constitution: input.constitution,
            resistance: input.resistance,
            defense: input.defense,
            movement: input.movement,
            speed: input.speed,
            purse: input.purse,
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
                hero
            }
        }
    }
    catch (err: any) {
        throw err;
    }
};
export const expireHeroContractsHandler = async (heroes: Hero[]) => {
    try {
        heroes.forEach((hero) => {
            RemoveHeroFromGuild(hero.id, hero.level);
        });
        return {
            success: true
        }
    }
    catch (err: any) {
        throw (err);
    }
};
export const generateHeroHandler = async () => {
    try {
        const heroInput = await GenerateHero();
        const hero = await CreateHero(heroInput);

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