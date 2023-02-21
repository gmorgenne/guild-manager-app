import type { AddStaffToGuildInput } from "../../types/staff";
import { prisma } from './../db/client';
import type { Prisma } from '@prisma/client';
import { getRandomBool, randomFromArray, randomName } from './commonService';
import { Races } from "../../types/races";
import { jobClasses } from "../../types/jobClasses";
import { jobSpecs } from "../../types/jobSpecs";


export const AddStaffToGuild = async (input: AddStaffToGuildInput) => {
    const staff = await prisma?.staff.findFirst({
        where: {
            id: input.staffId
        }
    });
    const newDate = new Date();
    const newContractLength = staff?.contractDemand ?? 20;
    newDate.setDate(new Date().getDate() + newContractLength);
    const updatedStaff = await prisma?.staff.update({
        where: {
            id: input.staffId
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
    const newPurse = (guild?.purse ?? 0) - (staff?.contractCost ?? 20);
    const updatedGuild = await prisma?.guild.update({
        where: {
            id: input.guildId
        },
        data: {
            purse: newPurse
        }
    });

    return {
        staff: updatedStaff,
        guild: updatedGuild
    }
};
export const CreateStaff = async (input: Prisma.StaffCreateInput) => {
    if (!input.guild) {
        input.guild = {
            connect: {
                id: "0"
            }
        }
    }
    return (await prisma?.staff.create({
        data: input
    }));
};
export const GenerateStaff = async () => {
    const sex = getRandomBool();
    const race = randomFromArray(Races, "Human");
    const jobClass = randomFromArray(jobClasses, "Guild Coach");
    const jobSpec = randomFromArray(jobSpecs, "Wizard Coach")

    return {
        name: randomName(race, sex),
        sex: sex,
        race: race,
        jobClass: jobClass,
        jobSpec: jobSpec,
        level: 1,
        experience: 0,
        contractExpiration: "9999-01-01T00:00:00Z"
    };
};
export const RemoveStaffFromGuild = async (input: string) => {
    const staff = await prisma?.staff.update({
        where: {
            id: input
        },
        data: {
            guildId: "0"
        }
    });
    return staff;
};