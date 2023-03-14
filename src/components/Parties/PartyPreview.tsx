import type { Hero, Party, Quest } from "@prisma/client";
import HeroPreview from "../Heroes/HeroPreview";
import PartyQuestSummary from "./PartyQuestSummary";

export interface PartyPreviewProps {
    party: (Party & { heroes: Hero[]; quest: Quest | null });
}

const PartyPreview = ({ party }: PartyPreviewProps): JSX.Element => {
    return (
        <section>
            <div className="lg:flex justify-between items-center">
                <div className="text-xl my-2">
                    <h2 className="text-3xl px-2">{party.name}</h2>
                </div>
                <span>Compatibility: <span className="font-bold">{`${(party.compatibility * 100).toFixed(2)}%`}</span></span>
            </div>
            <PartyQuestSummary party={party} />
            <div className="cards mb-4">
                {party.heroes?.map((hero, i) => {
                    return (
                        <div className="card" key={i}>
                            <HeroPreview hero={hero} link={false} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default PartyPreview;