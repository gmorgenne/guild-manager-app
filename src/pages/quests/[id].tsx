import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroPreview from "../../components/Heroes/HeroPreview";
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
            <section className="bg-indigo-300 p-4 rounded-3xl divide-y-8 divide-black">
                {parties && parties.map((party, i) => {
                    return (
                        <div key={i}>
                            <div className="lg:flex justify-between items-center">
                                <div className="text-xl my-2">
                                    <h2 className="text-3xl px-2">{party.name}</h2>
                                </div>
                                <button className="btn" onClick={() => assignPartyToQuest(party.id)}>Assign Party to Quest</button>
                                <span>Compatibility: <span className="font-bold">{`${(party.compatibility * 100).toFixed(2)}%`}</span></span>
                            </div>
                            <div className="cards mb-4">
                                {party.heroes && party.heroes.map((hero, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <HeroPreview hero={hero} link={false} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default QuestPage;