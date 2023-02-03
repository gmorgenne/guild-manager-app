import type { NextPage } from "next";
import { useRouter } from "next/router";
import QuestDetail from "../../components/Quests/QuestDetail";
import { trpc } from "../../utils/trpc";

const QuestPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const quest = trpc.quest.getQuest.useQuery({ id: id })?.data;

    return (
        <section>
            {quest && <QuestDetail {...quest} />}
        </section>
    )
}

export default QuestPage;