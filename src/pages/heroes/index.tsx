import type { NextPage } from "next";
import HeroPreview from "../../components/Heroes/HeroPreview";
import { trpc } from "../../utils/trpc";

const HeroesPage: NextPage = () => {
    const heroes = trpc.hero.getAll.useQuery()?.data;

    return (
        <div>
            <h1>All Heroes</h1>
            <div className="heroes-list flex p-4">
                {heroes && heroes.map((hero, i) => {
                    return (
                        <div className="hero p-4" key={i}>
                            <HeroPreview {...hero} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HeroesPage;