import type { Party } from "@prisma/client";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

export interface PartyQuestSummaryProps {
    party: Party
}

const PartyQuestSummary = ({ party }: PartyQuestSummaryProps): JSX.Element => {
    const quest = trpc.party.getPartyQuest.useQuery({ id: party.questId ?? "0" })?.data;

    return (
        <div className="border-t-2 border-b-2 border-black my-4">
            <h3 className="text-lg text-center">Current Quest</h3>
            <Link href={`/quests/${quest?.id}`}>
                <div className="lg:flex justify-between items-center">
                    <h4>Quest: {quest?.name}</h4>
                    <div>Location: {quest?.location}</div>
                    <div>League Quest?: {quest?.leagueQuest ? "true" : "false"}</div>
                </div>
            </Link>
        </div>
    )
}
export default PartyQuestSummary;