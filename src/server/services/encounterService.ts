import { prisma } from './../db/client';
import type { Prisma } from '@prisma/client';
import { getRandomInt } from './commonService';

export const createEncounter = async (input: Prisma.EncounterCreateInput) => {
    return (await prisma?.encounter.create({
        data: input
    }));
}
export const generateEncounter = async (municipalityId: string) : Promise<Prisma.EncounterCreateInput> => {
    const municipalityIndex = parseInt(municipalityId);
    const severity = municipalityIndex > 1 ? getRandomInt(1, 6) : getRandomInt(1, 3);
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