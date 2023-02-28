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
    const combatants : Combatant[] = [];
    heroes.forEach((hero) => {
        combatants.push(Object.assign(hero, {
            damageDealt: 0,
            initiative: getRandomInt(0, 20) + hero.dexterity,
            group: group,
            kills: 0
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
    const stats = generateStats();
    const heroClass = randomFromArray(Classes, "Fighter");
    const heroSubclass = randomFromArray(Subclasses, "Champion");
    let str, dex, mag, con, res, def, mov, spd = 8;

    switch (heroClass) {
        case "Cleric":
            res = stats[0];
            def = stats[1];
            mag = stats[2];
            con = stats[3];
            str = stats[4];
            dex = stats[5];
            break;
        case "Fighter":
            str = stats[0];
            def = stats[1];
            con = stats[2];
            dex = stats[3];
            res = stats[4];
            mag = stats[5];
            break;
        case "Ranger":
            dex = stats[0];
            str = stats[1];
            def = stats[2];
            con = stats[3];
            res = stats[4];
            mag = stats[5];
            break;
        case "Wizard":
            mag = stats[0];
            res = stats[1];
            con = stats[2];
            dex = stats[3];
            str = stats[4];
            def = stats[5];
            break;
        case "Monk":
            dex = stats[0];
            con = stats[1];
            mag = stats[2];
            res = stats[3];
            def = stats[4];
            str = stats[5];
            break;
        case "Bard":
            mag = stats[0];
            dex = stats[1];
            con = stats[2];
            res = stats[3];
            str = stats[4];
            def = stats[5];
            break;
        case "Druid":
            res = stats[0];
            mag = stats[1];
            con = stats[2];
            dex = stats[3];
            def = stats[4];
            str = stats[5];
            break;
        case "Rogue":
            dex = stats[0];
            con = stats[1];
            mag = stats[2];
            def = stats[3];
            res = stats[4];
            str = stats[5];
            break;
        case "Sorcerer":
            mag = stats[0];
            res = stats[1];
            dex = stats[2];
            con = stats[3];
            def = stats[4];
            str = stats[5];
            break;
        case "Warlock":
            res = stats[0];
            mag = stats[1];
            def = stats[2];
            con = stats[3];
            str = stats[4];
            dex = stats[5];
            break;
        case "Paladin":
            def = stats[0];
            str = stats[1];
            con = stats[2];
            res = stats[3];
            mag = stats[4];
            dex = stats[5];
            break;
        case "Barbarian":
            str = stats[0];
            con = stats[1];
            dex = stats[2];
            def = stats[3];
            res = stats[4];
            mag = stats[5];
            break;
    }

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
        healthPoints: 10 + (con ?? 8),
        strength: str ?? 8,
        dexterity: dex ?? 8,
        magic: mag ?? 8,
        constitution: con ?? 8,
        resistance: res ?? 8,
        defense: def ?? 8,
        movement: mov ?? 30,
        speed: spd ?? 10,
        purse: getRandomInt(0, 100),
        contractExpiration: "9999-01-01T00:00:00Z"
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

const generateStats = () => {
    const arr: number[] = [];
    while (arr.length < 6) {
        arr.push(getRandomInt(8, 19));
    }
    arr.sort((a, b) => { return b - a });
    return arr;
};