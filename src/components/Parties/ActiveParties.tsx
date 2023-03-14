import { useContext, useEffect, useState } from "react";
import type { IGuildPartyContext } from "./GuildPartyContext";
import { GuildPartyContext } from "./GuildPartyContext";
import PartyPreview from "./PartyPreview";

const ActiveParties = (): JSX.Element => {
    const { editingParty, parties } = useContext<IGuildPartyContext>(GuildPartyContext);
    const [activeParties, setActiveParties] = useState(parties);

    useEffect(() => {
        if (parties) {
            setActiveParties(parties);
        }
    }, [parties]);

    return (
        <section>
            {activeParties && (
                <div className="">
                    <h2 className="text-center text-3xl my-8">Active Party List</h2>
                    <div className="bg-indigo-300 p-4 rounded-3xl divide-y-8 divide-black">
                        {activeParties.filter((party) => party.id != editingParty?.id).map((party, i) => {
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