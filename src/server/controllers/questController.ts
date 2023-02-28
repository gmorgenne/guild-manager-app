import { createQuest, generateQuest, processQuest } from "../services/questService";

export const createQuestHandler = async (municipalityId?: string | null) => {
    try {
        const questInput = await generateQuest(municipalityId);
        const quest = await createQuest(questInput);

        return {
            status: 'success',
            data: {
                quest
            }
        }
    }
    catch (err: any) {
        throw err;
    }
};
export const processQuestHandler = async (questId: string, partyId: string) => {
    try {
        const result = await processQuest(questId, partyId);
        return {
            data: result.data,
            status: result.status
        }
    }
    catch (err: any) {
        throw err;
    }
}