import { createQuest, generateQuest } from "../services/questService";

export const createQuestHandler = async () => {
    try {
        const questInput = await generateQuest();
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