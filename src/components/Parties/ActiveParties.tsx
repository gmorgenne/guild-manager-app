import { useContext } from "react";
import type { IGuildPartyContext } from "./GuildPartyContext";
import { GuildPartyContext } from "./GuildPartyContext";
import PartyPreview from "./PartyPreview";

const ActiveParties = (): JSX.Element => {
    const { editingParty, parties } = useContext<IGuildPartyContext>(GuildPartyContext);

    return (
        <section>
            {parties && (
                <div className="">
                    <h2 className="text-center text-3xl my-8">Active Party List</h2>
                    <div className="bg-indigo-300 p-4 rounded-3xl divide-y-8 divide-black">
                        {parties.filter((party) => party.id != editingParty?.id).map((party, i) => {
                            return (
                                <div key={i}>
                                    <PartyPreview party={party} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </section>
    )
}

export default ActiveParties;