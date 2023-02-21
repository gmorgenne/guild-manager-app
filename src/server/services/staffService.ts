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