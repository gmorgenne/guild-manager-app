import type { Hero, Party, Quest } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { trpc } from "../../utils/trpc";
import type { IGuildPartyContext } from "./GuildPartyContext";
import { GuildPartyContext } from "./GuildPartyContext";

export interface PartyQuestSummaryProps {
    party: (Party & { heroes: Hero[]; quest: Quest | null });
}

const PartyQuestSummary = ({ party }: PartyQuestSummaryProps): JSX.Element => {
    const quest = party.quest;
    const cancelTrainingAvailable = party.questId ? party.questId === "0" : false;
    const guildPartyContext = useContext<IGuildPartyContext>(GuildPartyContext);
    const [show, setShow] = useState(party.questId && party.questId.length > 0);
    const [modalOpen, setModalOpen] = useState(false);
    const [questSuccess, setQuestSuccess] = useState(false);
    const [questSummary, setQuestSummary] = useState("");
    const router = useRouter();
    const processQuestMutation = trpc.quest.processQuest.useMutation({
        onSuccess: (data) => {
            setQuestSuccess(data.status);
            setQuestSummary(data.data);
        }
    });
    const resetQuestMutation = trpc.party.assignPartyToQuest.useMutation({
        onSuccess: () => {
            setShow(false);
        }
    });
    const assignPartyMutation = trpc.party.assignPartyToQuest.useMutation();

    const assignPartyToTraining = () => {
        assignPartyMutation.mutate({
            questId: "0",
            partyId: party.id
        });
        router.push(`/guild/facilities/training-grounds/${party.guildId}`);
    };
    const assignPartyToQuest = () => {
        router.push('/quests');
    };
    const cancelTraining = () => {
        // TODO: We need to compute results of training
        resetQuestMutation.mutate({ partyId: party.id });
    };
    const completeQuest = () => {
        if (quest && quest.id) {
            processQuestMutation.mutate({ partyId: party.id, questId: quest.id })
            setModalOpen(true);
        }
    };
    const deleteParty = () => {
        guildPartyContext.deleteParty(party.id);
    }
    const editParty = () => {
        guildPartyContext.setEditingParty(party);
        guildPartyContext.scrollToBottom();
    };
    const resetPartyQuest = () => {
        setModalOpen(false);
        resetQuestMutation.mutate({ partyId: party.id });
    };

    return (
        <section id="partyQuestSummary">
            {show && (
                <div className={`border-t-2 border-b-2 border-black my-4 text-center ${show ? "" : "hidden"}`}>
                <h3 className="text-lg">Current Quest</h3>
                {party.questId === "0"
                ? 
                    <div><h4>Quest: {quest?.name}</h4></div>
                :
                    <Link href={`/quests/${quest?.id}`}>
                        <div className="lg:grid grid-cols-3 my-4">
                            <h4>Quest: {quest?.name}</h4>
                            <div>Location: {quest?.location}</div>
                            <div>League Quest?: {quest?.leagueQuest ? "true" : "false"}</div>
                        </div>
                    </Link>
                }
                {/* TODO: if quest completed show "See Quest Result button" OR always says "See Quest Status" and if quest not completed, content shows how long the quest has taken so far */}
                {!cancelTrainingAvailable && <button className="btn" onClick={completeQuest}>See Quest Result</button>}
                {cancelTrainingAvailable && <button onClick={cancelTraining} className="btn">Cancel Training</button>}
                <Modal isOpen={modalOpen} onRequestClose={resetPartyQuest}>
                    <button onClick={resetPartyQuest} className="btn--close">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h4 className="text-xl">Quest Summary Details</h4>
                    <div className="my-8">
                        <h5 className="text-lg mb-4">{questSuccess ? "Success!" : "FAIL!!"}</h5>
                        <p>Here is what happened:</p>
                        <div className="quest-summary" dangerouslySetInnerHTML={{__html: questSummary}}></div>
                    </div>
                </Modal>
            </div>
            )}
            {!show && (
                <div>
                    <button onClick={assignPartyToQuest} className="btn">Assign Party To Quest</button>
                    <button onClick={assignPartyToTraining} className="btn">Assign Party To Training</button>
                    <button onClick={editParty} className="btn">Edit Party</button>
                    <button onClick={deleteParty} className="btn">Delete Party</button>
                </div>
            )}
        </section>
    )
};
export default PartyQuestSummary;