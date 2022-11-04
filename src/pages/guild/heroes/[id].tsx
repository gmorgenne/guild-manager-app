import type { NextPage } from "next";
import { useRouter } from "next/router";
import HeroPreview from "../../../components/Heroes/HeroPreview";
import { trpc } from "../../../utils/trpc";

const HeroesPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: id })?.data;

    return (
        <div>
            <h1>Guild Heroes</h1>
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