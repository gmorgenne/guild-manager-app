import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
    const [levelSort, setLevelSort] = useState("asc");
    const [contractCostSort, setContractCostSort] = useState("asc");
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: "0", classes: classes, alignments: alignments, races: races, levelSort: levelSort, contractCostSort: contractCostSort })?.data;
    const [guildId, setGuildId] = useState("");
    const [filterClosed, setFilterClosed] = useState(true);
    const [sortClosed, setSortClosed] = useState(true);
    const filterRef = useRef<HTMLDivElement | null>(null);
    const sortRef = useRef<HTMLDivElement | null>(null);

    const toggleFilter = () => {
        setFilterClosed(!filterClosed);
    };

    const toggleSort = () => {
        setSortClosed(!sortClosed);
    }

    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const guild = sessionStorage.getItem("guild") ?? "";
        if (guild)
            setGuildId(guild);

        const outsideFilterClick = (event: any) => {
            if (!filterClosed && filterRef.current && !filterRef.current.contains(event.target)) {
                setFilterClosed(true);
            }
        };
        const outsideSortClick = (event: any) => {
            if (!sortClosed && sortRef.current && !sortRef.current.contains(event.target)) {
                setSortClosed(true);
            }
        };
        document.addEventListener("click", outsideFilterClick, false);
        document.addEventListener("click", outsideSortClick, false);

        return () => {
            document.removeEventListener("click", outsideFilterClick, false);
            document.removeEventListener("click", outsideSortClick, false);
        }
    }, [filterClosed, sortClosed]);

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
                <div className="flex gap-4 md:gap-8">
                    <div ref={sortRef}>
                        <button className="btn" onClick={() => toggleSort()}>Sort</button>
                        <div className={`fixed top-8 md:top-auto${sortClosed ? "" : " -translate-x-full"} left-full z-10 w-full max-w-4xl shadow-xl rounded-b-2xl bg-indigo-100 h-3/4 md:h-auto overflow-y-auto transition-transform duration-300 border-8 border-black shadow-left-xl dark:bg-gray-800`}>
                            <h3 className="text-center text-2xl py-8 border-b-2 border-black">Sort Heroes</h3>
                            <div>
                                <h3 className="text-xl">Sort by Level</h3>
                                <button className={`btn${levelSort === "asc" ? " btn--active" : ""}`} onClick={() => setLevelSort("asc")}>Asc</button>
                                <button className={`btn${levelSort === "desc" ? " btn--active" : ""}`} onClick={() => setLevelSort("desc")}>Desc</button>
                            </div>
                            <div>
                                <h3 className="text-xl">Sort by Contract Cost</h3>
                                <button className={`btn${contractCostSort === "asc" ? " btn--active" : ""}`} onClick={() => setContractCostSort("asc")}>Asc</button>
                                <button className={`btn${contractCostSort === "desc" ? " btn--active" : ""}`} onClick={() => setContractCostSort("desc")}>Desc</button>
                            </div>
                            <div className="text-center border-t-4 border-black">
                                <button className="btn" onClick={() => toggleSort()}>Close</button>
                            </div>
                        </div>
                    </div>
                    <div ref={filterRef}>
                        <button className={`btn${(classes && classes.length > 0) || (alignments && alignments.length > 0) || (races && races.length > 0) ? " btn--active" : ""}`} onClick={() => toggleFilter()}>Filter</button>
                        <div className={`fixed top-8 md:top-auto${filterClosed ? "" : " -translate-x-full"} left-full z-10 w-full max-w-4xl shadow-xl rounded-b-2xl bg-indigo-100 h-3/4 md:h-auto overflow-y-auto transition-transform duration-300 border-8 border-black shadow-left-xl dark:bg-gray-800`}>
                            <h3 className="text-center text-2xl py-8 border-b-2 border-black">Filter Heroes</h3>
                            <BasicFacet FacetName="Class" FacetValues={Classes} />
                            <BasicFacet FacetName="Race" FacetValues={Races} />
                            <BasicFacet FacetName="Alignment" FacetValues={Alignments} />
                            <div className="text-center border-t-4 border-black">
                                <button className="btn" onClick={() => toggleFilter()}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>

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