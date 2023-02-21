import type { AddStaffToGuildInput } from "../../types/staff";


export const AddStaffToGuild = async (input: AddStaffToGuildInput) => {
    const updatedStaff = await prisma?.staff.update({
        where: {
            id: input.staffId
        },
        data: {
            guild: {
                connect: {
                    id: input.guildId
                }
            }
        }
    });

    return {
        staff: updatedStaff
    }
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