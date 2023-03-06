import { createEncounter, generateEncounter } from "../services/encounterService";

export const createEncounterHandler = async (municipalityId: string) => {
    try {
        const encounterInput = await generateEncounter(municipalityId);
        const encounter = await createEncounter(encounterInput);

        return {
            status: 'success',
            data: {
                encounter
            }
        }
    } 
    catch (err: any) {
        console.error(err);
    }
}