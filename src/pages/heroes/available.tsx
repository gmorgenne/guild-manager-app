import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeroPreview from "../../components/Heroes/HeroPreview";
import { trpc } from "../../utils/trpc";

const HeroesPage: NextPage = () => {
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: "0" })?.data;
    const [guildId, setGuildId] = useState("");

    useEffect(() => {
        if (typeof window === 'undefined') 
            return;
        const guild = sessionStorage.getItem("guild") ?? "";
        if (guild)
            setGuildId(guild);
    }, []);

    return (
        <div>
            <h1 className="text-2xl my-8">Available Heroes</h1>
            <div className="tabs-container">
                <ul className="tabs">
                    <li className="tab"><Link href="/heroes">All</Link></li>
                    <li className="tab active"><Link href="#">Available</Link></li>
                </ul>
            </div>
            {!heroes && <p>Loading...</p>}
            <div className="cards">
                {heroes && heroes.map((hero, i) => {
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