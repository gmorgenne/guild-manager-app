import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveParties from "../../components/Parties/ActiveParties";
import GuildPreview from "../../components/Guilds/GuildPreview";
import PartyBuilder from "../../components/Parties/PartyBuilder";
import { trpc } from "../../utils/trpc";
import GuildPartyContextProvider from "../../components/Parties/GuildPartyContext";

const GuildPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() || "";
    const guild = trpc.guild.getGuildById.useQuery({ id: id })?.data;

    // TODO:
    // determine other info for guild screen: facilities, guild upgrades, world/city view, contract expiration warnings, 
    // other party actions? (material gathering, studying, drinking to boost bond/morale, regular quest, league quest)

    return (
        <section>
            {guild && (
                <section className="flex flex-col gap-8">
                    <h1 className="text-2xl mt-8">Guild Overview</h1>
                    <section className="flex flex-col md:flex-row gap-8 md:items-start justify-between">
                        <div className="rounded-3xl border-2 border-gray-500 bg-gray-300">
                            <GuildPreview {...guild} />
                        </div>
                        <div className="text-center rounded-3xl border-2 border-gray-500 bg-gray-300 p-4 min-w-[50%]">
                            <div>League: m.1/r.1/g.1</div>
                            <div>Guild Purse: <span className="bg-yellow-400">{guild.purse}</span></div>
                            <div>Guild located in: {guild.municipality?.name}</div>
                            <div className="flex gap-4 my-4">
                                <Link href="/heroes/available" className="btn--full">Hire Hero</Link>
                                <Link href={`/guild/heroes/${guild.id}`} className="btn--full">Guild Hero Roster</Link>
                            </div>
                            <div className="flex gap-4 mb-4">
                                <Link href="/quests" className="btn--full">Available Quests</Link>
                                <Link href={`/guild/facilities/${guild.id}`} className="btn--full">Guild Facilities</Link>
                            </div>
                            <div className="flex gap-4 mb-4">
                                <Link href={`/guild/facilities/shop/${id}`} className="btn--full">Visit the Shop</Link>
                            </div>
                        </div>
                        <div className="rounded-3xl border-2 border-gray-500 bg-gray-300 p-4">
                            <h4 className="text-lg font-bold my-2 md:mt-0">Guild Facilities Levels</h4>
                            <div className="flex justify-between">
                                <span>Guild Hall:</span>
                                <span>{guild.guildHallLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Training Grounds:</span>
                                <span>{guild.trainingGroundLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Infirmary:</span>
                                <span>{guild.infirmaryLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Guild Arena:</span>
                                <span>{guild.guildArenaLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Workshop:</span>
                                <span>{guild.workshopLevel}</span>
                            </div>
                        </div>
                    </section>
                    <GuildPartyContextProvider guildId={id}>
                        <ActiveParties />
                        <PartyBuilder />
                    </GuildPartyContextProvider>
                </section>
            )}
        </section>
    )
}

export default GuildPage;