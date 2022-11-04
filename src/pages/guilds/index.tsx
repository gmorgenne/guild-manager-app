import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import GuildPreview from "../../components/Guilds/GuildPreview";
import { trpc } from "../../utils/trpc";

const Guild: NextPage = () => {
    const { data: sessionData } = useSession();
    const userGuild = trpc.guild.getUserGuild.useQuery({ userId: sessionData?.user?.id })?.data;

    return (
        <div>
            <div className="user-data">
                <h2>User Data:</h2>
                {sessionData?.user?.name && <div>Name: {sessionData?.user?.name}</div>}
                {sessionData?.user?.email && <div>Email: {sessionData?.user?.email}</div>}
                {sessionData?.user?.image && <Image src={sessionData?.user?.image} alt={sessionData?.user?.name ?? ""} width={30} height={30} />}
            </div>

            <Link href="/guilds/new-guild">Create New Guild</Link>

            <div className="user-guilds">
                {userGuild && (
                    <div className="guild p-4">
                        <h1>Your Guild:</h1>
                        <GuildPreview {...userGuild} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Guild;