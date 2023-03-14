import type { Hero } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import HeroPreview from "../Heroes/HeroPreview";
import type { IGuildPartyContext } from "./GuildPartyContext";
import { GuildPartyContext } from "./GuildPartyContext";

type RenamePartyForm = {
    NewPartyName: string;
}

const PartyBuilder = (): JSX.Element => {
    const router = useRouter();
    const guildPartyContext = useContext<IGuildPartyContext>(GuildPartyContext);
    const availableHeroes = guildPartyContext.availableHeroes;
    const [partyHeroes, setPartyHeroes] = useState<Hero[]>(guildPartyContext.editingParty?.heroes || []);
    const [partyName, setPartyName] = useState(guildPartyContext.editingParty?.name || "Party 1");
    const [renamingParty, setRenamingParty] = useState(false);
    const { handleSubmit, register, setValue } = useForm<RenamePartyForm>({
        defaultValues: { NewPartyName: partyName }
    }); 
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
                const uniqueAlignments = [...new Set(alignments)];
                const modifier = Math.min(uniqueAlignments?.length, alignments?.length);
                return compatibility / modifier;
            }
            return compatibility;
        }
        const compatibility = computePartyCompatibility();
        return {
            compatibility: compatibility,
            heroes: partyHeroes,
            id: guildPartyContext.editingParty?.id || "",
            name: partyName
        }
    }, [partyHeroes, partyName, guildPartyContext.editingParty?.id]);

    const addHeroToParty = (hero: Hero) => {
        setPartyHeroes(partyHeroes?.concat({ ...hero }) ?? [hero]);
        const heroes = availableHeroes?.filter((h) => { return hero != h });
        guildPartyContext.availableHeroes = heroes;
    };
    const assignPartyToQuest = () => {
        if (party.id) {
            guildPartyContext.updateParty({
                compatibility: party.compatibility,
                heroIds: partyHeroes?.map(hero => hero.id) || [],
                id: party.id
            });
        } else {
            guildPartyContext.createParty({
                compatibility: party.compatibility,
                guild: guildPartyContext.guildId,
                heroIds: partyHeroes?.map(hero => hero.id) || [],
                name: party.name
            });
        }
        router.push('/quests');
    };
    const assignPartyToTraining = () => {
        if (party.id) {
            guildPartyContext.updateParty({
                compatibility: party.compatibility,
                heroIds: partyHeroes?.map(hero => hero.id) || [],
                id: party.id
            });
        } else {
            guildPartyContext.createParty({
                compatibility: party.compatibility,
                guild: guildPartyContext.guildId,
                heroIds: partyHeroes?.map(hero => hero.id) || [],
                name: party.name,
                quest: "0"
            });
        }
        router.push(`/guild/facilities/training-grounds/${guildPartyContext.guildId}`);
    };
    const removeHeroFromParty = (hero: Hero) => {
        guildPartyContext.availableHeroes = availableHeroes?.concat({ ...hero }) ?? [hero];
        const index = partyHeroes?.indexOf(hero) ?? -1;
        if (index > -1) {
            const heroes = partyHeroes?.filter((h) => { return hero != h });
            setPartyHeroes(heroes);
        }
    };
    const renameParty = ({ NewPartyName }: RenamePartyForm) => {
        if (party.id) {
            guildPartyContext.renameParty(party.id, NewPartyName);
        }
        setPartyName(NewPartyName);
        setRenamingParty(false);
    };
    const saveParty = () => {
        if (party.id) {
            guildPartyContext.updateParty({
                compatibility: party.compatibility,
                heroIds: partyHeroes?.map(hero => hero.id) || [],
                id: party.id
            });
        } else {
            guildPartyContext.createParty({
                compatibility: party.compatibility,
                guild: guildPartyContext.guildId,
                heroIds: partyHeroes?.map(hero => hero.id) || [],
                name: party.name
            });
        }
        guildPartyContext.setEditingParty(undefined);
        setPartyHeroes([]);
        setPartyName("");
    };

    useEffect(() => {
        // TODO: is this needed?
        setValue("NewPartyName", party.name);
    }, [party.name, partyName, setValue])

    useEffect(() => {
        if (guildPartyContext.editingParty) {
            setPartyHeroes(guildPartyContext.editingParty.heroes);
            setPartyName(guildPartyContext.editingParty.name);
        }

    }, [guildPartyContext.editingParty]);

    return (
        <section>
            {party && (
                <div>
                    <h2 className="text-center text-3xl my-8">Party Builder</h2>
                    <p>Assign heroes to parties to take on quests! Once the party is assigned a quest that party will not be editable until they return.</p>
                    {partyHeroes && partyHeroes.length > 0 && (
                        <div className="bg-gray-400 p-4 rounded-3xl">
                            <div className="lg:flex justify-between items-center">
                                <div className="text-xl my-2">
                                    {renamingParty ? (
                                        <form noValidate onSubmit={handleSubmit(renameParty)}>
                                            <label>Name: </label>
                                            <input type="text" className="h-10 px-2" {...register("NewPartyName")} />
                                            <button type="submit" className="btn">Submit</button>
                                        </form>
                                    ): (
                                        <div className="flex items-center">
                                            <h2 className="text-3xl px-2">{partyName}</h2>
                                            <button className="btn" onClick={() => setRenamingParty(true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> 
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button onClick={assignPartyToQuest} className="btn">Assign Party To Quest</button>
                                    <button onClick={assignPartyToTraining} className="btn">Assign Party To Training</button>
                                    <button onClick={saveParty} className="btn">Save Party</button>
                                </div>
                                <span>Compatibility: <span className="font-bold">{`${(party.compatibility * 100).toFixed(2)}%`}</span></span>
                            </div>
                            <div className="cards">
                                {partyHeroes.map((hero, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <HeroPreview hero={hero} link={false} />
                                            <button className="close" onClick={() => removeHeroFromParty(hero)}>X</button>
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
                    <h2 className="text-center text-3xl my-8">Available Heroes</h2>
                    <div className="cards">
                        {availableHeroes.map((hero, i) => {
                            return (
                                <button className="card" key={i} onClick={() => addHeroToParty(hero)}>
                                    <HeroPreview hero={hero} link={false} />
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
            {availableHeroes?.length === 0 && <Link href="/heroes/available" className="btn">Hire Hero</Link>}
        </section>
    );
}

export default PartyBuilder;