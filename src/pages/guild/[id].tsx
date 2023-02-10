import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveParties from "../../components/Guilds/ActiveParties";
import GuildPreview from "../../components/Guilds/GuildPreview";
import PartyBuilder from "../../components/Guilds/PartyBuilder";
import { trpc } from "../../utils/trpc";

const GuildPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() || "";
    const guild = trpc.guild.getGuildById.useQuery({ id: id })?.data;

    // TODO:
    // determine other info for guild screen: facilities, guild upgrades, world/city view, contract expiration warnings, 
    // other party actions? (material gathering, studying, drinking to boost bond/morale, regular quest, league quest)

    return (
        <div>
            {guild && (
                <div>
                    <h1 className="text-2xl my-8">Guild Overview</h1>
                    <section className="md:flex">
                        <div className="p-4 rounded border-2 border-gray-500 max-w-1/2">
                            <GuildPreview {...guild} />
                            <span>Created Date: {guild.createdDate.toLocaleDateString("en-us")}</span>
                        </div>
                        <table className="text-center md:ml-8">
                            <caption className="text-lg my-2">Guild Facilities</caption>
                            <thead>
                                <tr>
                                    <th className="table-cell">Mess Hall</th>
                                    <th className="table-cell">Workshop</th>
                                    <th className="table-cell">Training Ground</th>
                                    <th className="table-cell">Barracks</th>
                                    <th className="table-cell">Infirmary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="table-cell">{guild.messHallLevel}</td>
                                    <td className="table-cell">{guild.workshopLevel}</td>
                                    <td className="table-cell">{guild.trainingGroundLevel}</td>
                                    <td className="table-cell">{guild.barracksLevel}</td>
                                    <td className="table-cell">{guild.infirmaryLevel}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="md:ml-8 bg-yellow-400 text-center p-4">
                            <span>Guild Purse: {guild.purse}</span>
                        </div>
                    </section>
                    <section>
                        Guild located in: {guild.municipality?.name}
                    </section>
                    <section className="flex">
                        <Link href="/heroes/available" className="btn">Add Hero</Link>
                        <Link href={`/guild/heroes/${guild.id}`} className="btn">Guild Hero Roster</Link>
                        <Link href="/quests" className="btn">Available Quests</Link>
                    </section>
                    <ActiveParties guildId={id} />
                    <PartyBuilder />
                </div>
            )}
        </div>
    )
}

export default GuildPage;