import { prisma } from './../db/client';
import type { Prisma } from '@prisma/client';
import type { AddStaffToCrewInput } from '../../types/crew';

export const AddStaffToCrew = async (input: AddStaffToCrewInput) => {
    const updatedStaff = await prisma?.staff.update({
        where: {
            id: input.staffId
        },
        data: {
            crew: {
                connect: {
                    id: input.crewId
                }
            }
        }
    });

    return {
        staff: updatedStaff
    }
};
export const CreateCrew = async (input: Prisma.CrewCreateInput) => {
    return (await prisma?.crew.create({
        data: input
    }));
};