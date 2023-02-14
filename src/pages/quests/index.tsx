import type { Municipality } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuestPreview from "../../components/Quests/QuestPreview";
import { trpc } from "../../utils/trpc";

const QuestsPage: NextPage = () => {
    const { data, error, isError, isLoading } = trpc.quest.getAll.useQuery();
    const [guildId, setGuildId] = useState("");
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') 
            return;
        const guild = sessionStorage.getItem("guild") ?? "";
        if (guild)
            setGuildId(guild);
    }, []);

    useEffect(() => {
        if (!data)
            return;
        setMunicipalities([...new Map(data?.map((quest) => [quest.municipality.id, quest.municipality])).values()]);
    }, [data])

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
                <h1 className="text-2xl my-8">Available Quests</h1>
            </section>
            <section>
                {/* TODO: determine method to pick a quest by municipality? Does this change page? Just fire query and refresh results? */}
                {data && municipalities && (
                    <div>
                        <h3 className="text-lg">Available Municipalities</h3>
                        <div className="mb-4">
                            {municipalities.map((municipality, i) => {
                                return (
                                    <div key={i}>{municipality.name}</div>
                                )
                            })}
                        </div>
                    </div>
                )}
                
            </section>
            <section>
                <div className="cards">
                    {data && data.map((quest, i) => {
                        return (
                            <div className="card" key={i}>
                                <QuestPreview quest={quest} link={true} municipality={quest.municipality} />
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