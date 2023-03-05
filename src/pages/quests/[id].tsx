import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuestDetail from "../../components/Quests/QuestDetail";
import { trpc } from "../../utils/trpc";

const QuestPage: NextPage = () => {
    const [guildId, setGuildId] = useState("");
    const router = useRouter();
    const id = router.asPath.split('/').pop() ?? "";
    const quest = trpc.quest.getQuest.useQuery({ id: id })?.data;
    const parties = trpc.party.getAvailablePartiesByGuildId.useQuery({ id: guildId })?.data;
    const assignPartyMutation = trpc.party.assignPartyToQuest.useMutation()

    const assignPartyToQuest = (partyId: string) => {
        assignPartyMutation.mutate({
            questId: id,
            partyId: partyId
        });
        router.push(`/guild/${guildId}`);
    };

    useEffect(() => {
        if (typeof window === 'undefined') 
            return;
        const guild = sessionStorage.getItem("guild") ?? "";
        if (guild)
            setGuildId(guild);
    }, []);

    return (
        <>
            <section>
                {quest && <QuestDetail encounters={quest.encounters} municipality={quest.municipality} quest={quest} />}
            </section>
            <section>
                {parties && parties.map((party, i) => {
                    return (
                        <div key={i}>
                            {party.name}
                            <br /><br />
                            {party.compatibility}
                            <br /><br />
                            {party.heroes && party.heroes.map((hero, i) => {
                                return (
                                    <>
                                        <br />
                                        {hero.name}
                                        <br />
                                    </>
                                )
                            })}
                            <button className="btn" onClick={() => assignPartyToQuest(party.id)}>Assign Party to Quest</button>
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default QuestPage;