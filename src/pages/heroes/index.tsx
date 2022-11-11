import type { NextPage } from "next";
import Link from "next/link";
import HeroPreview from "../../components/Heroes/HeroPreview";
import { trpc } from "../../utils/trpc";

const HeroesPage: NextPage = () => {
    const { data, error, isError, isLoading } = trpc.hero.getAll.useQuery();
    const guildId = sessionStorage.getItem("guild");
    
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
            <div className="tabs-container">
                <ul className="tabs">
                    <li className="tab active"><Link href="#">All</Link></li>
                    <li className="tab"><Link href="/heroes/available">Available</Link></li>
                </ul>
            </div>
            <div className="cards">
                {data && data.map((hero, i) => {
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