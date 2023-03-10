import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroPreview from "../../components/Heroes/HeroPreview";
import { trpc } from "../../utils/trpc";

const HeroesPage: NextPage = () => {
    const { data, error, isError, isLoading } = trpc.hero.getAll.useQuery();
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
        <div>
            <h1 className="text-2xl my-8">All Heroes</h1>
            <div className="flex mb-8 justify-between border-b border-gray-200 dark:border-gray-700">
                <div className="tabs-container">
                    <ul className="tabs">
                        <li className="tab active"><Link href="#">All</Link></li>
                        <li className="tab"><Link href="/heroes/available">Available</Link></li>
                    </ul>
                </div>
            </div>
            <div className="cards">
                {data && data.map((hero, i) => {
                    return (
                        <div className="card" key={i}>
                            <HeroPreview hero={hero} link={true} />
                        </div>
                    )
                })}
            </div>
            {guildId && (
                <div className="mt-8">
                    <Link href={`/guild/${guildId}`} className="btn">Back to guild</Link>
                </div>
            )}
        </div>
    )
}

export default HeroesPage;