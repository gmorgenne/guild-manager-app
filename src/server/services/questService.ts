import { ConvertHeroesToCombatants } from './heroService';
import { FIGHT } from './combatService';
import { prisma } from './../db/client';
import type { Hero, Prisma } from '@prisma/client';
import { getRandomBool, getRandomInt, randomFromArray, randomName } from './commonService';
import { Races } from "../../types/races";
import { createEncounterHandler } from '../controllers/encounterController';
import { randomInt } from 'crypto';
import { Enemies } from '../../types/enemies';
import type { Combatant } from './../../types/enemies';

export const createQuest = async (input: Prisma.QuestCreateInput) => {
    return (await prisma?.quest.create({
        data: input
    }));
};
export const generateQuest = async (municipalityId?: string | null): Promise<Prisma.QuestCreateInput> => {
    const sex = getRandomBool();
    const race = randomFromArray(Races, "Human");
    const giverName = randomName(race, sex);
    municipalityId = municipalityId || randomInt(0, 3).toString();
    let purseGain = 0;

    const encounterIds: string[] = [];
    const encounterConnect: Prisma.Enumerable<Prisma.EncounterWhereUniqueInput> = [];
    const encountersToCreate = getRandomInt(1, 4);
    // compute a severity level to use for item drop?
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
            id: municipalityId || "0"
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
                id: municipalityId || "0"
            }
        },
        encounters: {
            connect: encounterConnect
        }
    };
};
export const processQuest = async (questId: string, partyId: string) => {
    const party = await prisma.party.findFirst({
        where: {
            id: partyId
        },
        include: {
            guild: {
                select: {
                    municipalityId: true
                },
            },
            heroes: true,
            quest: true,
            QuestResult: true
        }
    });
    const quest = await prisma.quest.findFirst({
        where: {
            id: questId
        },
        include: {
            encounters: true,
            municipality: true,
            QuestResult: true
        }
    });
    const municipalityId = party?.guild.municipalityId;
    const sameMunicipality = quest?.municipalityId == municipalityId || false;
    const heroes = party?.heroes || [];
    const encounters = quest?.encounters;
    let questSummary = "<h2>Quest Begins!</h2>";

    if (heroes?.length < 1) {
        questSummary += "<p>no heroes in this party?</p>"
        return {
            data: questSummary,
            status: false
        }
    }

    const findGiverSuccess = findGiver(sameMunicipality, heroes);
    if (!findGiverSuccess) {
        questSummary += "<p>didn't even find giver...</p>"
        return {
            data: questSummary,
            status: false
        };
    }
    questSummary += `<p>Heroes have found ${quest?.giver} in ${quest?.municipality.name} and have accepted the quest.</p>`;
    
    const findLocationSuccess = findLocation(sameMunicipality, heroes);
    if (!findLocationSuccess) {
        questSummary += "<p>didn't find location...</p>"
        return {
            data: questSummary,
            status: false
        };
    }
    questSummary += `<p>Heroes have travelled to ${quest?.location}</p>`;

    const heroCombatants = ConvertHeroesToCombatants(heroes, 2); // enemy combatant is group 1, heroes is group 2
    if (heroCombatants.length === 0) {
        questSummary += "<p>failed to convert heroes to combatants</p>"
        return {
            data: questSummary,
            status: false
        };
    }
    
    // determine success of each encounter
    let availableHeroes = heroCombatants;
    let encounterSuccess = false;
    let encounterFailureMessage = "";
    encounters?.forEach((encounter) => {
        questSummary += "<p>Encounter Begins!</p>";
        // TODO: if heroes defeated in previous encounter, return
        if (availableHeroes.length === 0) {
            encounterFailureMessage = "no available heroes for this encounter";
            return;
        }
        const enemyCount = encounter.enemies;
        const severity = encounter.severity;
        
        if (enemyCount > 0) {
            // handle encounter as combat against enemies
            const enemies = generateEnemyCombatants(severity, enemyCount);
            if (enemies.length === 0) {
                encounterFailureMessage = "generate enemies did not do it's only job!";
                return;
            }
            questSummary += "<p>Enemies approach! FIGHT!</p>";
            const results = FIGHT(enemies, heroCombatants);
            questSummary += results.summary;
            if (results.victors[0]?.group !== 2) { // enemy combatant is group 1, heroes is group 2
                encounterFailureMessage = "defeated by enemies!";
                return;
            }
            availableHeroes = results.victors.filter((v) => v.group == 2 && v.healthPoints > 0);
        } else {
            // handle encounter as a trap of severity
            questSummary += "<p>IT'S A TRAP!!!!</p>";
        }
        questSummary += "<p>Encounter Completed!</p>";
        encounterSuccess = true;
    });

    // TODO: no matter the result of the encounter, update heroes stats (kills, exp, etc...)
    // TODO: figure out way to ensure that if a hero falls in an encounter their stats from the encounter are preserved...
    if (!encounterSuccess) {
        questSummary += `<p>found giver, travelled to location, failed encounter: ${encounterFailureMessage}</p>`
        return {
            data: questSummary,
            status: false
        };
    }
    questSummary += "<p>Party has completed all encounters successfully!</p>"

    const returnGiverSuccess = returnToGiver(sameMunicipality, heroes);
    if (!returnGiverSuccess) {
        questSummary += "<p>quest completed, but giver is gone or dead...</p>"
        return {
            data: questSummary,
            status: false
        };
    }
    questSummary += `<p>Heroes have found ${quest?.giver} in ${quest?.municipality.name} and have received ${quest?.rewardGold} gold for completing the quest.</p>`;

    questSummary += "<p>Quest Completed!</p>";
    return {
        data: questSummary,
        status: true
    }
}

// privates :p lolz
const generateEnemyCombatants = (severity: number, count: number) => {
    const enemies: Combatant[] = [];
    const availableEnemies = Enemies.get(severity);
    if (!availableEnemies || availableEnemies.some((enemy) => enemy == undefined)) return [];
    const z = availableEnemies?.length || 0;
    for(let i = 0; i <= count; i++) {
        const enemy = availableEnemies[getRandomInt(0, z)];
        if (enemy) {
            enemies.push(Object.assign(enemy, {
                alignment: "",
                damageDealt: 0,
                group: 1,
                initiative: getRandomInt(1, 20),
                kills: 0,
                purse: 0,
                type: enemy.enemyType || ""
            }));
        }
    }
    return enemies;
};
// TODO: OK, so for now findGiver & returnToGiver are basically the same but I kept them separate for future changes
const findGiver = (sameMunicipality: boolean, heroes: Hero[]) => {
    let success = sameMunicipality;
    if (heroes?.some((hero) => hero.class == "Ranger" || hero.class == "Bard")) {
        success = true;
    }
    const findChance = randomInt(0, 100);
    if (findChance > 5) {
        success = true;
    }
    return success;
};
const findLocation = (sameMunicipality: boolean, heroes: Hero[]) => {
    let success = sameMunicipality;
    if (heroes?.some((hero) => hero.class == "Ranger")) {
        success = true;
    }
    const locationChance = randomInt(0, 100);
    if (locationChance > 3) {
        success = true;
    }
    return success;
}
const returnToGiver = (sameMunicipality: boolean, heroes: Hero[]) => {
    let success = sameMunicipality;
    if (heroes?.some((hero) => hero.class == "Ranger" || hero.class == "Bard")) {
        success = true;
    }
    const returnChance = randomInt(0, 100);
    if (returnChance > 5) {
        success = true;
    }
    return success;
};