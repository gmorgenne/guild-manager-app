import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroPreview from "../../components/Heroes/HeroPreview";
import BasicFacet from "../../components/Navigation/BasicFacet";
import { Alignments } from "../../types/alignments";
import { Classes } from "../../types/classes";
import { Races } from "../../types/races";
import { trpc } from "../../utils/trpc";

const HeroesPage: NextPage = () => {
    const router = useRouter();
    const [classes, setClasses] = useState<string[]>();
    const [alignments, setAlignments] = useState<string[]>();
    const [races, setRaces] = useState<string[]>();
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: "0", classes: classes, alignments: alignments, races: races })?.data;
    const [guildId, setGuildId] = useState("");

    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const guild = sessionStorage.getItem("guild") ?? "";
        if (guild)
            setGuildId(guild);
    }, []);

    useEffect(() => {
        const classValues = router.query.Class || [];
        const alignmentValues = router.query.Alignment || [];
        const raceValues = router.query.Race || [];
        let selectedClasses: string[] = [];
        let selectedAlignments: string[] = [];
        let selectedRaces: string[] = [];
        selectedClasses = selectedClasses.concat(classValues);
        selectedAlignments = selectedAlignments.concat(alignmentValues);
        selectedRaces = selectedRaces.concat(raceValues);
        setClasses(selectedClasses);
        setAlignments(selectedAlignments);
        setRaces(selectedRaces);
    }, [router.query.Class, router.query.Alignment, router.query.Race]);

    return (
        <div>
            <h1 className="text-5xl text-center my-8">Available Heroes</h1>
            <div className="flex mb-8 justify-between border-b border-gray-200 dark:border-gray-700">
                <div className="tabs-container">
                    <ul className="tabs">
                        <li className="tab"><Link href="/heroes">All</Link></li>
                        <li className="tab active"><Link href="#">Available</Link></li>
                    </ul>
                </div>
                <BasicFacet FacetName="Class" FacetValues={Classes} />
                <BasicFacet FacetName="Race" FacetValues={Races} />
                <BasicFacet FacetName="Alignment" FacetValues={Alignments} />
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