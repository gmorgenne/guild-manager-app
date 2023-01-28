import { createEncounterHandler } from "../../controllers/encounterController";
import { router, publicProcedure } from "../trpc";


export const encounterRouter = router({
    createEncounter: publicProcedure
        .query(() => createEncounterHandler() ),
    getAll: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.encounter.findMany();
        })
});
