import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import HeroPreview from "../../../components/Heroes/HeroPreview";
import { trpc } from "../../../utils/trpc";

const HeroesPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: id })?.data;

    return (
        <div>
            <h1 className="text-2xl my-8">Guild Heroes</h1>
            <div className="cards">
                {heroes && heroes.map((hero, i) => {
                    return (
                        <div className="card" key={i}>
                            <HeroPreview {...hero} />
                        </div>
                    )
                })}
            </div>
            <div className="mt-8">
                <Link href={`/guild/${id}`} className="btn">Back to guild</Link>
            </div>
        </div>
    )
}

export default HeroesPage;