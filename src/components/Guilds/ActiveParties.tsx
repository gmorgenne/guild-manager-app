import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import PartyPreview from "../Parties/PartyPreview";

export interface ActivePartyProps {
    guildId: string
}

const ActiveParties = ({ guildId }: ActivePartyProps): JSX.Element => {
    const parties = trpc.party.getPartiesByGuildId.useQuery({ id: guildId })?.data;
    const [activeParties, setActiveParties] = useState(parties ?? []);

    useEffect(() => {
        if (parties) {
            setActiveParties(parties);
        }
    }, [parties]);
    return (
        <section>
            {parties && (
                <div className="">
                    <h2 className="text-xl my-8">Active Party List</h2>
                    <div className="bg-indigo-400 p-4 rounded-3xl">
                        {activeParties.map((party, i) => {
                            return (
                                <div key={i}>
                                    <PartyPreview heroes={party.heroes} party={party} />
                                    <hr className="text-black" />
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