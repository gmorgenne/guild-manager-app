import { z } from "zod";
import { addStaffToGuildHandler } from "../../controllers/staffController";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const staffRouter = router({
    addStaff: protectedProcedure
        .input(z.object({
            guildId: z.string(),
            staffId: z.string()
        }))
        .mutation(({ input, ctx }) => addStaffToGuildHandler({ input, ctx })),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.staff.findMany();
    }),
    getStaff: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.staff.findFirst({
                where: {
                    id: {
                        equals: input.id
                    }
                }
            })
        }),
    getStaffByGuild: protectedProcedure
        .input(z.object({ id: z.string()}))
        .query(({ input, ctx }) => {
            return ctx.prisma.staff.findMany({
                where: {
                    guildId: {
                        equals: input?.id
                    }
                }
            })
        })
});