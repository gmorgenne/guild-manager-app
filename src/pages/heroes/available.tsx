import type { NextPage } from "next";
import Link from "next/link";
import HeroPreview from "../../components/Heroes/HeroPreview";
import { trpc } from "../../utils/trpc";

const HeroesPage: NextPage = () => {
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: "0" });
    const guildId = sessionStorage.getItem("guild");

    return (
        <div>
            <h1 className="text-2xl my-8">Available Heroes</h1>
            <div className="tabs-container">
                <ul className="tabs">
                    <li className="tab"><Link href="/heroes">All</Link></li>
                    <li className="tab active"><Link href="#">Available</Link></li>
                </ul>
            </div>
            {!heroes?.data && <p>Loading...</p>}
            <div className="cards">
                {heroes?.data && heroes.data.map((hero, i) => {
                    return (
                        <div className="card" key={i}>
                            <HeroPreview {...hero} />
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