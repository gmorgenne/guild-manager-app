import { z } from 'zod';
import { createEncounterHandler } from "../../controllers/encounterController";
import { router, publicProcedure } from "../trpc";


export const encounterRouter = router({
    createEncounter: publicProcedure
        .input((z.object({ municipalityId: z.string() })))
        .query(({ input }) => createEncounterHandler(input.municipalityId) ),
    getAll: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.encounter.findMany();
        })
});
