import { createQuest, generateQuest } from "../services/questService";

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