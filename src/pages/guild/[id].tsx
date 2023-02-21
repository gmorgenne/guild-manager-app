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
                    <section className="md:flex gap-8 md:items-start">
                        <div className="rounded border-2 border-gray-500 max-w-1/2">
                            <GuildPreview {...guild} />
                        </div>
                        <table className="text-center block md:table mt-8 md:mt-0">
                            <caption className="text-lg block md:table-caption">Guild Facilities Levels</caption>
                            <thead className="block md:table-header-group">
                                <tr className="block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                    <th className="tbl-cell">Guild Hall</th>
                                    <th className="tbl-cell">Training Grounds</th>
                                    <th className="tbl-cell">Infirmary</th>
                                    <th className="tbl-cell">Guild Arena</th>
                                    <th className="tbl-cell">Workshop</th>

                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group">
                                <tr className="block md:table-row">
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Guild Hall</span>{guild.messHallLevel}</td>
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Training Grounds</span>{guild.trainingGroundLevel}</td>
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Infirmary</span>{guild.infirmaryLevel}</td>
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Guild Arena</span>{guild.barracksLevel}</td>
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Workshop</span>{guild.workshopLevel}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="bg-yellow-400 text-center p-4 mt-8 md:mt-0 rounded">
                            <span>Guild Purse: {guild.purse}</span>
                        </div>
                    </section>
                    <section>
                        Guild located in: {guild.municipality?.name}
                    </section>
                    <section className="flex">
                        <Link href="/heroes/available" className="btn">Hire Hero</Link>
                        <Link href={`/guild/heroes/${guild.id}`} className="btn">Guild Hero Roster</Link>
                        <Link href="/quests" className="btn">Available Quests</Link>
                        <Link href={`/guild/facilities/${guild.id}`} className="btn">Guild Facilities</Link>
                    </section>
                    <ActiveParties guildId={id} />
                    <PartyBuilder />
                </div>
            )}
        </div>
    )
}

export default GuildPage;