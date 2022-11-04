import type {  NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import GuildPreview from "../../components/Guilds/GuildPreview";
import { trpc } from "../../utils/trpc";

const GuildPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop();
    const guild = trpc.guild.getGuildById.useQuery({ id: id })?.data;

    return (
        <div>
            {guild && (
                <div>
                    <h1>Guild Overview & stuff</h1>
                    <div className="p-4">
                        <GuildPreview {...guild} />
                        <Link href="/heroes">Add Hero</Link>
                        <br />
                        <Link href={`/guild/heroes/${guild.id}`}>Guild Hero Roster</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GuildPage;