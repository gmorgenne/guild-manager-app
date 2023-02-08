import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuestPreview from "../../components/Quests/QuestPreview";
import { trpc } from "../../utils/trpc";

const QuestsPage: NextPage = () => {
    const { data, error, isError, isLoading } = trpc.quest.getAll.useQuery();
    const [guildId, setGuildId] = useState("");

    useEffect(() => {
        if (typeof window === 'undefined') 
            return;
        const guild = sessionStorage.getItem("guild") ?? "";
        if (guild)
            setGuildId(guild);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        console.log('error: ', error);
        return <div>Error</div>
    }
    
    return (
        <>
            <section>
                <h1 className="text-2xl my-8">All Quests</h1>
            </section>
            <section>
                <div className="cards">
                    {data && data.map((quest, i) => {
                        return (
                            <div className="card" key={i}>
                                <QuestPreview quest={quest} link={true} />
                            </div>
                        )
                    })}
                </div>
            </section>
            <section>
            {guildId && (
                <div className="mt-8">
                    <Link href={`/guild/${guildId}`} className="btn">Back to guild</Link>
                </div>
            )}
            </section>
        </>
    )
}

export default QuestsPage;