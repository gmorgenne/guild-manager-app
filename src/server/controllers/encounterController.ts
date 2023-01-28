import { createEncounter, generateEncounter } from "../services/encounterService";

export const createEncounterHandler = async () => {
    try {
        const encounterInput = await generateEncounter();
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