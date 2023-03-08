import { createCrewHandler } from "../../controllers/crewController";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const crewRouter = router({
    createCrew: protectedProcedure
        .input(z.object({
            compatibility: z.number(),
            guild: z.string(),
            staffIds: z.array(z.string()),
            name: z.string(),
        }))
        .mutation(({ input, ctx }) => createCrewHandler({ input, ctx })),
    getAvailableCrewsByGuildId: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.crew.findMany({
                where: {
                    guildId: {
                        equals: input?.id
                    }
                },
                include: {
                    staff: true
                }
            })
        }),
    getCrewsByGuildId: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.crew.findMany({
                where: {
                    guildId: {
                        equals: input?.id
                    }
                },
                include: {
                    staff: true
                }
            })
        }),
    getAll: publicProcedure.query(({ ctx }) => {
            return ctx.prisma.crew.findMany();
        }),
    renameCrew: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string()
        }))
        .mutation(({ input, ctx }) => {
            const updated = ctx.prisma.crew.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name
                }
            });
            updated.then((data) => { return { data: data}});
        })
});
