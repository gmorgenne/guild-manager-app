import type { Party } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import { trpc } from "../../utils/trpc";

export interface PartyQuestSummaryProps {
    party: Party
}

const PartyQuestSummary = ({ party }: PartyQuestSummaryProps): JSX.Element => {
    const quest = trpc.party.getPartyQuest.useQuery({ id: party.questId ?? "0" })?.data;
    const [modalOpen, setModalOpen] = useState(false);
    const cancelTrainingAvailable = party.questId ? party.questId === "0" : false;
    const [questSuccess, setQuestSuccess] = useState(false);
    const [questSummary, setQuestSummary] = useState("");
    const processQuestMutation = trpc.quest.processQuest.useMutation({
        onSuccess: (data) => {
            setQuestSuccess(data.status);
            setQuestSummary(data.data);
        }
    });

    const cancelTraining = () => {
        console.log('stop training');
    }

    const completeQuest = () => {
        if (quest && quest.id) {
            processQuestMutation.mutate({ partyId: party.id, questId: quest.id })
            setModalOpen(true);
        }
    }

    const resetPartyQuest = () => {
        console.log('reset party quest');
        setModalOpen(false);
    }

    return (
        <div className="border-t-2 border-b-2 border-black my-4 text-center">
            <h3 className="text-lg">Current Quest</h3>
            <Link href={`/quests/${quest?.id}`}>
                <div className="lg:flex justify-between items-center my-4">
                    <h4>Quest: {quest?.name}</h4>
                    <div>Location: {quest?.location}</div>
                    <div>League Quest?: {quest?.leagueQuest ? "true" : "false"}</div>
                </div>
            </Link>
            {/* TODO: if quest completed show "See Quest Result button" */}
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
    )
}
export default PartyQuestSummary;