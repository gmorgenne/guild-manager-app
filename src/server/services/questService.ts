import { prisma } from './../db/client';
import type { Prisma } from '@prisma/client';
import { getRandomBool, getRandomInt, randomFromArray, randomName } from './commonService';
import { Races } from "../../types/races";
import { createEncounterHandler } from '../controllers/encounterController';

export const createQuest = async (input: Prisma.QuestCreateInput) => {
    return (await prisma?.quest.create({
        data: input
    }));
}

export const generateQuest = async () : Promise<Prisma.QuestCreateInput> => {
    // TODO: add optional input that can be used to create quests for certain municipalities
    const sex = getRandomBool();
    const race = randomFromArray(Races, "Human");
    const giverName = randomName(race, sex);
    let purseGain = 0;

    const encounterIds: string[] = [];
    const encounterConnect: Prisma.Enumerable<Prisma.EncounterWhereUniqueInput> = [];  
    const encountersToCreate = getRandomInt(1, 4);
    for (let i = 1; i < encountersToCreate; i++) {
        const encounter = await createEncounterHandler().then((response) => { return response?.data?.encounter });
        if (encounter?.id)
            encounterIds.push(encounter?.id);
        if (encounter?.purseGain)
            purseGain += encounter?.purseGain;
    } 
    
   encounterIds.forEach((encounterId) => {
        encounterConnect.push({
            id: encounterId
        });
   });

   const municipality = await prisma.municipality.findUnique({
        where: {
            id: "0" // TODO: pass optional input
        }
   });
   const location = municipality?.locations ? randomFromArray(municipality?.locations, "farm") : "farm";
   const name = `help ${giverName} solve problem at ${location} in ${municipality?.name}`;

    return {
        name: name,
        giver: giverName,
        location: location,
        rewardGold: purseGain,
        rewardItems: [], // TODO: determine how to decide reward items
        municipality: {
            connect: {
                id: "0" // TODO: pass optional input
            }
        },
        encounters: {
            connect: encounterConnect
        }
    };
}