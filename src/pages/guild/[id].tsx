import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import GuildPreview from "../../components/Guilds/GuildPreview";
import PartyBuilder from "../../components/Guilds/PartyBuilder";
import { trpc } from "../../utils/trpc";

const GuildPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop();
    const guild = trpc.guild.getGuildById.useQuery({ id: id })?.data;
    // TODO: display active parties with quest info
    // TODO: determine other info for guild screen: facilities, guild upgrades, world/city view, contract expiration warnings, party actions? (training, material gathering, studying, drinking to boost bond/morale, regular quest, league quest)

    return (
        <div>
            {guild && (
                <div>
                    <h1 className="text-2xl my-8">Guild Overview</h1>
                    <div className="p-4 rounded border-2 border-gray-500 max-w-prose">
                        <GuildPreview {...guild} />
                    </div>
                    <div className="flex">
                        <Link href="/heroes/available" className="btn">Add Hero</Link>
                        <Link href={`/guild/heroes/${guild.id}`} className="btn">Guild Hero Roster</Link>
                    </div>
                    <PartyBuilder />
                </div>
            )}
        </div>
    )
}

export default GuildPage;