import type { NextPage } from "next";
import HeroPreview from "../../components/Heroes/HeroPreview";
import { trpc } from "../../utils/trpc";

const HeroesPage: NextPage = () => {
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: "0" });
    return (
        <div>
            <h1>Available Heroes</h1>
            <div className="heroes-list grid grid-cols-5 gap-4 p-4">
                {!heroes?.data && <p>Loading...</p>}
                {heroes?.data && heroes.data.map((hero, i) => {
                    return (
                        <div className="hero" key={i}>
                            <HeroPreview {...hero} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HeroesPage;