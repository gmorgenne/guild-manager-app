import type { Party } from "@prisma/client";
import Link from "next/link";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import HeroPreview from "../Heroes/HeroPreview";
import PartyQuestSummary from "./PartyQuestSummary";

export interface PartyPreviewProps {
    party: Party
}
const PartyPreview = ({ party }: PartyPreviewProps): JSX.Element => {
    const heroes = trpc.hero.getHeroesByPartyId.useQuery({ id: party.id })?.data;
    const [partyName, setPartyName] = useState(party.name);
    const renamePartyMutation = trpc.party.renameParty.useMutation({
        onSuccess: (data) => {
            setPartyName(data?.data?.party?.name);
        }
    });
    const activeQuest = party.questId ? party.questId !== "0" : false;
    const cancelTrainingAvailable = party.questId ? party.questId === "0" : false;

    const assignPartyToQuest = () => {
        console.log('assign party to quest');
    }
    const cancelTraining = () => {
        console.log('stop training');
    }
    const renameParty = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        renamePartyMutation.mutate({ id: party.id, name: value });
    }

    // TODO:
    // if active quest, link to quest status page
    // if no active quest, allow party to be editable (swap heroes, assign to new quest, disband party)
    return (
        <>
            <div className="lg:flex justify-between items-center">
                <h2 className="text-xl my-2">
                    <label>Name: </label>
                    <input name="partyName" value={partyName} type="text" onChange={renameParty} className="h-10 px-2" />
                </h2>
                <div>
                    {/* Party Actions, if applicable */}
                    {activeQuest && <Link href="#">Quest Status</Link>}
                    {(!activeQuest && !cancelTrainingAvailable) && <button onClick={assignPartyToQuest} className="btn">Assign Party To Quest</button>}
                    {cancelTrainingAvailable && <button onClick={cancelTraining} className="btn">Cancel Training</button>}
                </div>
                <span>Compatibility: <span className="font-bold">{`${(party.compatibility * 100).toFixed(2)}%`}</span></span>
            </div>
            {party.questId && <PartyQuestSummary party={party} />}
            <div className="cards mb-4">
                {heroes?.map((hero, i) => {
                    return (
                        <div className="card" key={i}>
                            <HeroPreview hero={hero} link={false} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PartyPreview;