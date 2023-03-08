import { z } from "zod";
import { addStaffToGuildHandler, createStaffHandler, generateStaffHandler, removeStaffFromGuildHandler } from "../../controllers/staffController";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const staffRouter = router({
    addStaff: protectedProcedure
        .input(z.object({
            guildId: z.string(),
            staffId: z.string()
        }))
        .mutation(({ input, ctx }) => addStaffToGuildHandler({ input, ctx })),
    createStaff: protectedProcedure
        .input(z.object({
          name: z.string(),
          sex: z.boolean(),
          race: z.string(),
          jobClass: z.string(),
          jobSpec: z.string(),
          guild: z.string()
        }))
        .mutation(({ input, ctx }) => createStaffHandler({ input, ctx })),
    generateStaff: protectedProcedure
        .query(() => { generateStaffHandler().then((data) => { return data.data.staff }) }),
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
        }),
    getStaffByCrewId: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.staff.findMany({
                where: {
                    crewId: {
                        equals: input?.id
                    }
                }
            })
        }),
    removeStaffFromGuild: protectedProcedure
        .input(z.string())
        .mutation(({ input, ctx }) => removeStaffFromGuildHandler({ input, ctx })),
});
