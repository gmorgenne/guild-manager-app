import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import GuildPreview from "../../components/Guilds/GuildPreview";
import { trpc } from "../../utils/trpc";

const Guild: NextPage = () => {
    const { data: sessionData } = useSession();
    const userGuilds = trpc.guild.getUserGuilds.useQuery({ userId: sessionData?.user?.id })?.data;

    const setSessionGuild = (guildId: string) => {
        sessionStorage.setItem("guild", guildId);
    }

    return (
        <>
            <Head>
                <title>Guild Manager</title>
                <meta name="description" content="Guild Manager - Create a guild, manage it into the ground!" />
            </Head>

            <div className="my-8">
                <Link href="/guild/new-guild" className="btn">
                    Create New Guild
                </Link>
                <Link href="/guild/guilds" className="btn">
                    All Guilds
                </Link>

                <div className="user-guilds mt-8">
                    {userGuilds && (
                        <div className="guild-list">
                            <h2 className="text-xl mb-4">Your Guilds:</h2>
                            <div className="cards">
                                {userGuilds.map((guild, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <Link href={`/guild/${guild.id}`} onClick={() => { setSessionGuild(guild.id) }}>
                                                <GuildPreview {...guild} />
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Guild;