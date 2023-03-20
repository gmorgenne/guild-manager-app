import { LevelUpMap } from './../../types/hero';
import { prisma } from './../db/client';
import type { Hero, Prisma } from '@prisma/client';
import type { AddHeroToGuildInput } from '../../types/hero';
import { getRandomBool, getRandomInt, randomFromArray, randomName } from './commonService';
import { Races } from '../../types/races';
import { Classes } from '../../types/classes';
import { Subclasses } from '../../types/subclasses';
import { Alignments } from '../../types/alignments';
import type { Combatant } from './../../types/enemies';

export const AddHeroToGuild = async (input: AddHeroToGuildInput) => {
    const hero = await prisma?.hero.findFirst({
        where: {
            id: input.heroId
        }
    });
    const newDate = new Date();
    const newContractLength = hero?.contractDemand ?? 20;
    newDate.setDate(new Date().getDate() + newContractLength);
    const updatedHero = await prisma?.hero.update({
        where: {
            id: input.heroId
        },
        data: {
            guild: {
                connect: {
                    id: input.guildId
                }
            },
            contractExpiration: {
                set: newDate
            }
        }
    });

    const guild = await prisma?.guild.findFirst({
        where: {
            id: input.guildId
        }
    });
    const newPurse = (guild?.purse ?? 0) - (hero?.contractCost ?? 20);
    const updatedGuild = await prisma?.guild.update({
        where: {
            id: input.guildId
        },
        data: {
            purse: newPurse
        }
    });

    return {
        hero: updatedHero,
        guild: updatedGuild
    }
};
export const ConvertHeroesToCombatants = (heroes: Hero[], group: number) => {
    const combatants: Combatant[] = [];
    heroes.forEach((hero) => {
        combatants.push(Object.assign(hero, {
            damageDealt: 0,
            experienceGained: group == 2 ? 20 : 0, // if group 2 they are in a quest, have found the giver and travelled to the encounter so they should get 20 xp base
            initiative: getRandomInt(0, 20) + hero.dexterity,
            group: group,
            kills: 0,
            purse: 0,
            type: `${hero.class}-${hero.subclass}`
        }));
    });
    return combatants;
}
export const CreateHero = async (input: Prisma.HeroCreateInput) => {
    if (!input.guild) {
        input.guild = {
            connect: {
                id: "0"
            }
        }
    }
    return (await prisma?.hero.create({
        data: input
    }));
};
export const GenerateHero = async () => {
    const sex = getRandomBool();
    const race = randomFromArray(Races, "Human");
    const stats = generateStats(0, 10);
    const heroClass = randomFromArray(Classes, "Fighter");
    const availableSubClasses = Subclasses.get(heroClass) || [];
    const heroSubclass = randomFromArray(availableSubClasses, "Champion");
    const { con, def, dex, mag, res, str } = allocateStatsByClass(heroClass, stats);
    let mov = 0;
    let spd = 0;

    switch (race) {
        case "Dwarf":
            spd = 8;
            mov = 25;
            break;
        case "Elf":
            spd = 12;
            mov = 35;
            break;
        case "Human":
            spd = 10;
            mov = 30;
            break;
        case "Minotaur":
            spd = 10;
            mov = 30;
            break;
        case "Orc":
            spd = 10;
            mov = 30;
            break;
        case "Warforged":
            spd = 10;
            mov = 30;
            break;
        case "Dragonborn":
            spd = 10;
            mov = 30;
            break;
        case "Gnome":
            spd = 8;
            mov = 25;
            break;
        case "Half-Elf":
            spd = 10;
            mov = 30;
            break;
        case "Halfing":
            spd = 8;
            mov = 25;
            break;
        case "Tiefling":
            spd = 10;
            mov = 30;
            break;
        case "Leonin":
            spd = 12;
            mov = 35;
            break;
        case "Satyr":
            spd = 12;
            mov = 35;
            break;
        case "Owlin":
            spd = 10;
            mov = 30;
            break;
        case "Tabaxi":
            spd = 12;
            mov = 35;
            break;
        case "Bugbear":
            spd = 10;
            mov = 30;
            break;
        case "Centaur":
            spd = 14;
            mov = 40;
            break;
        case "Goblin":
            spd = 8;
            mov = 25;
            break;
        case "Lizardfolk":
            spd = 10;
            mov = 30;
            break;
        case "Tortle":
            spd = 10;
            mov = 30;
            break;
        case "Half-Orc":
            spd = 10;
            mov = 30;
            break;
        case "Goliath":
            spd = 10;
            mov = 30;
            break;
        case "Harengon":
            spd = 12;
            mov = 35;
            break;
    }

    return {
        name: randomName(race, sex),
        sex: sex,
        race: race,
        class: heroClass,
        subclass: heroSubclass,
        alignment: randomFromArray(Alignments, "NeutralGood"),
        level: 1,
        experience: 0,
        healthPoints: 10 + con,
        maxHealthPoints: 10 + con,
        strength: str,
        dexterity: dex,
        magic: mag,
        constitution: con,
        resistance: res,
        defense: def,
        movement: mov,
        speed: spd,
        purse: getRandomInt(0, 100),
        contractExpiration: "9999-01-01T00:00:00Z",
        contractCost: getRandomInt(16, 26),
    };
};
export const RemoveHeroFromGuild = async (input: string) => {
    const hero = await prisma?.hero.update({
        where: {
            id: input
        },
        data: {
            guildId: "0"
        }
    });
    return hero;
};
export const UpdateHero = async (input: heroUpdate) => {
    const updatedHero = await prisma?.hero.update({
        where: {
            id: input.heroId
        },
        data: {
            kills: {
                increment: input.kills
            },
            experience: {
                increment: input.newXP
            },
            purse: {
                increment: input.purse
            },
            purseAcquired: {
                increment: input.purse
            },
            attemptedQuests: {
                increment: 1
            },
            successfulQuests: {
                increment: input.questSuccess ? 1 : 0
            },
            happiness: {
                increment: input.questSuccess ? 5 : -5
            },
            healthPoints: {
                set: input.newHP
            },
            maxHealthPoints: {
                set: input.newMaxHP
            },
            level: {
                increment: input.leveledUp ? 1 : 0
            },
            strength: {
                increment: input.leveledUp ? input.updatedStats.str : 0
            },
            dexterity: {
                increment: input.leveledUp ? input.updatedStats.dex : 0
            },
            magic: {
                increment: input.leveledUp ? input.updatedStats.mag : 0
            },
            constitution: {
                increment: input.leveledUp ? input.updatedStats.con : 0
            },
            resistance: {
                increment: input.leveledUp ? input.updatedStats.res : 0
            },
            defense: {
                increment: input.leveledUp ? input.updatedStats.def : 0
            }
        }
    });
    return {
        hero: updatedHero
    }
}
export const UpdateHeroWithCombatant = (hero: Hero, combatant: Combatant) => {
    const newXP = hero.experience + combatant.experienceGained;
    const lvl = LevelUpMap.get(hero.level) || 5000;
    let levelUp = false;
    let newLvl = hero.level;
    let newMaxHp = hero.maxHealthPoints;
    let newHP = combatant.healthPoints > 0 ? combatant.healthPoints : 0;
    let hpBoost = 0;
    if (newXP > lvl) {
        levelUp = true;
        hpBoost = getRandomInt(hero.constitution, (hero.constitution + 6));
        newMaxHp += hpBoost;
        newHP = newMaxHp;
        newLvl += 1;
    }
    const maxStatBoost = levelUp ? 3 : 0; // TODO: is this exponential? Does it scale by level?
    const stats = generateStats(0, maxStatBoost);
    const updatedStats = levelUp ? allocateStatsByClass(hero.class, stats) : { con: 0, def: 0, dex: 0, mag: 0, res: 0, str: 0 };

    return {
        leveledUp: levelUp,
        newHP: newHP,
        newLvl: newLvl,
        newMaxHP: newMaxHp,
        purse: combatant.purse,
        updatedHealth: hpBoost,
        updatedStats: updatedStats
    }
};

// privates :p lolz
const allocateStatsByClass = (heroClass: string, stats: number[]) => {
    stats = stats || [1, 1, 1, 0, 0, 0];
    let str = 0;
    let dex = 0;
    let mag = 0;
    let con = 0;
    let def = 0;
    let res = 0;
    switch (heroClass) {
        case "Cleric":
            res = stats[0] || 1;
            def = stats[1] || 1;
            mag = stats[2] || 1;
            con = stats[3] || 0;
            str = stats[4] || 0;
            dex = stats[5] || 0;
            break;
        case "Fighter":
            str = stats[0] || 1;
            def = stats[1] || 1;
            con = stats[2] || 1;
            dex = stats[3] || 0;
            res = stats[4] || 0;
            mag = stats[5] || 0;
            break;
        case "Ranger":
            dex = stats[0] || 1;
            str = stats[1] || 1;
            def = stats[2] || 1;
            con = stats[3] || 0;
            res = stats[4] || 0;
            mag = stats[5] || 0;
            break;
        case "Wizard":
            mag = stats[0] || 1;
            res = stats[1] || 1;
            con = stats[2] || 1;
            dex = stats[3] || 0;
            str = stats[4] || 0;
            def = stats[5] || 0;
            break;
        case "Monk":
            dex = stats[0] || 1;
            con = stats[1] || 1;
            mag = stats[2] || 1;
            res = stats[3] || 0;
            def = stats[4] || 0;
            str = stats[5] || 0;
            break;
        case "Bard":
            mag = stats[0] || 1;
            dex = stats[1] || 1;
            con = stats[2] || 1;
            res = stats[3] || 0;
            str = stats[4] || 0;
            def = stats[5] || 0;
            break;
        case "Druid":
            res = stats[0] || 1;
            mag = stats[1] || 1;
            con = stats[2] || 1;
            dex = stats[3] || 0;
            def = stats[4] || 0;
            str = stats[5] || 0;
            break;
        case "Rogue":
            dex = stats[0] || 1;
            con = stats[1] || 1;
            mag = stats[2] || 1;
            def = stats[3] || 0;
            res = stats[4] || 0;
            str = stats[5] || 0;
            break;
        case "Sorcerer":
            mag = stats[0] || 1;
            res = stats[1] || 1;
            dex = stats[2] || 1;
            con = stats[3] || 0;
            def = stats[4] || 0;
            str = stats[5] || 0;
            break;
        case "Warlock":
            res = stats[0] || 1;
            mag = stats[1] || 1;
            def = stats[2] || 1;
            con = stats[3] || 0;
            str = stats[4] || 0;
            dex = stats[5] || 0;
            break;
        case "Paladin":
            def = stats[0] || 1;
            str = stats[1] || 1;
            con = stats[2] || 1;
            res = stats[3] || 0;
            mag = stats[4] || 0;
            dex = stats[5] || 0;
            break;
        case "Barbarian":
            str = stats[0] || 1;
            con = stats[1] || 1;
            dex = stats[2] || 1;
            def = stats[3] || 0;
            res = stats[4] || 0;
            mag = stats[5] || 0;
            break;
    }

    return {
        str: str,
        dex: dex,
        mag: mag,
        con: con,
        res: res,
        def: def
    };
};
const generateStats = (min: number, max: number) => {
    const arr: number[] = [];
    while (arr.length < 6) {
        arr.push(getRandomInt(min, max));
    }
    arr.sort((a, b) => { return b - a });
    return arr;
};

type heroUpdate = {
    heroId: string;
    leveledUp: boolean;
    kills: number;
    newHP: number;
    newLvl: number;
    newMaxHP: number;
    newXP: number;
    purse: number;
    questSuccess: boolean;
    updatedHealth: number;
    updatedStats: {
        str: number;
        dex: number;
        mag: number;
        con: number;
        res: number;
        def: number;
    }
};