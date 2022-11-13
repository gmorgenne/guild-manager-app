import type { Hero } from "@prisma/client";
import { useRouter } from "next/router";
import type { ChangeEvent, MouseEventHandler } from "react";
import { useMemo, useState } from "react";
import HeroPreview from "../../components/Heroes/HeroPreview";
import { trpc } from "../../utils/trpc";

const PartyBuilder = (): JSX.Element => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop();
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: id })?.data;
    // TODO: add initialAvailableHeroes = heroes where partyID is null or 0 or whatever...
    const [availableHeroes, setAvailableHeroes] = useState<Hero[]>(heroes ?? []);
    const [partyHeroes, setPartyHeroes] = useState<Hero[]>();
    const [partyName, setPartyName] = useState("Party 1");
    const party = useMemo(() => {
        const getRelevance = (a: string, b: string) => {
            a = a || "";
            b = b || "";
            if (a.length > 0 && b.length > 0) {
                const pairs1 = getBigrams(a);
                const pairs2 = getBigrams(b);
                const union = pairs1.length + pairs2.length;
                let hits = 0;
                for (let i = 0; i < pairs1.length; i++) {
                    for (let j = 0; j < pairs2.length; j++) {
                        if (pairs1[i] == pairs2[j]) hits++;
                    }
                }
                if (hits > 0) {
                    return ((2.0 * hits) / union);
                }
            }
            return 0.0;
        }
        const getBigrams = (string: string) => {
            string = string.toLowerCase();
            const v = string.split('');
            for (let i = 0; i < v.length; i++) {
                v[i] = string.slice(i, i + 2);
            }
            return v;
        }
        const computePartyCompatibility = () => {
            let compatibility = 0;
            const alignments = partyHeroes?.map((hero) => { return hero.alignment }) ?? [];
            if (alignments?.length > 1) {
                for (let i = 1; i < alignments.length; i++) {
                    compatibility += getRelevance(alignments[i - 1] ?? "", alignments[i] ?? "");
                }
                if (alignments?.length > 2) {
                    compatibility += getRelevance(alignments[0] ?? "", alignments[alignments?.length - 1] ?? "");
                }
            }
            return compatibility;
        }
        const compatibility = computePartyCompatibility();
        return {
            compatibility: compatibility,
            heroes: partyHeroes,
            name: partyName
        }
    }, [partyHeroes, partyName]);

    const assignPartyToQuest = () => {
        // TODO: save party to db
        console.log('assign party to quest');
    }
    const addHeroToParty = (e: MouseEventHandler<HTMLButtonElement>, hero: Hero) => {
        setPartyHeroes(partyHeroes?.concat({ ...hero }) ?? [hero]);
        const heroes = availableHeroes?.filter((h) => { return hero != h });
        setAvailableHeroes(heroes ?? []);
    }
    const removeHeroFromParty = (e: MouseEventHandler<HTMLButtonElement>, hero: Hero) => {
        setAvailableHeroes(availableHeroes?.concat({ ...hero }) ?? [hero]);
        const index = partyHeroes?.indexOf(hero) ?? -1;
        if (index > -1) {
            const heroes = partyHeroes?.filter((h) => { return hero != h });
            setPartyHeroes(heroes);
        }
    }
    const renameParty = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPartyName(value);
    }

    return (
        <>
            {party && (
                <div>
                    <h2 className="text-xl my-8">Party Builder</h2>
                    <p>Assign heroes to parties to take on quests! Once the party is assigned a quest that party will not be editable until they return.</p>
                    {partyHeroes && (
                        <div className="bg-yellow-100 p-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl my-2">
                                    <input name="partyName" value={partyName} type="text" onChange={renameParty} className="h-10 px-2" />
                                </h2>
                                <button onClick={assignPartyToQuest} className="btn">Assign Party To Quest</button>
                                <span>Compatibility: <span className="font-bold">{`${(party.compatibility * 100).toFixed(2)}%`}</span></span>
                            </div>
                            <div className="cards">
                                {partyHeroes.map((hero, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <HeroPreview hero={hero} link={false} />
                                            <button className="close" onClick={(e: any) => removeHeroFromParty(e, hero)}>X</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {availableHeroes && (
                <div>
                    <h2 className="text-xl my-8">Available Heroes</h2>
                    <div className="cards">
                        {availableHeroes.map((hero, i) => {
                            return (
                                <button className="card" key={i} onClick={(e: any) => addHeroToParty(e, hero)}>
                                    <HeroPreview hero={hero} link={false} />
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default PartyBuilder;