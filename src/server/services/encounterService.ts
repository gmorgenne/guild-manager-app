import { prisma } from './../db/client';
import type { Prisma } from '@prisma/client';
import { getRandomInt } from './commonService';

export const createEncounter = async (input: Prisma.EncounterCreateInput) => {
    return (await prisma?.encounter.create({
        data: input
    }));
}
export const generateEncounter = async () : Promise<Prisma.EncounterCreateInput> => {
    const severity = getRandomInt(1, 6);
    const maxEnemies = Math.ceil(8 / severity);
    const enemies = getRandomInt(1, maxEnemies);
    const basePurseGain = getRandomInt(5, 250);
    return {
        enemies: enemies,
        experienceGain: enemies * severity * 10,
        purseGain: basePurseGain + (severity * enemies),
        severity: severity
    };
}