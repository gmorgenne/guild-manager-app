import type { Hero, Party } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import HeroPreview from "../Heroes/HeroPreview";
import PartyQuestSummary from "./PartyQuestSummary";

export interface PartyPreviewProps {
    heroes: Hero[]
    party: Party
}
type RenamePartyForm = {
    NewPartyName: string;
}
const PartyPreview = ({ heroes, party }: PartyPreviewProps): JSX.Element => {
    const [partyName, setPartyName] = useState(party.name);
    const renamePartyMutation = trpc.party.renameParty.useMutation({});
    //const partyEditable = party.questId ? party.questId != "0" : false;
    const [renamingParty, setRenamingParty] = useState(false);
    const { handleSubmit, register } = useForm<RenamePartyForm>({
        defaultValues: { NewPartyName: partyName }
    });
    
    const renameParty = ({ NewPartyName }: RenamePartyForm) => {
        renamePartyMutation.mutate({ id: party.id, name: NewPartyName });
        setPartyName(NewPartyName);
        setRenamingParty(false);
    }

    // TODO:
    // if no active quest, allow party to be editable (swap heroes, assign to new quest, disband party)
    return (
        <section>
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
                <span>Compatibility: <span className="font-bold">{`${(party.compatibility * 100).toFixed(2)}%`}</span></span>
            </div>
            <PartyQuestSummary party={party} />
            <div className="cards mb-4">
                {heroes?.map((hero, i) => {
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