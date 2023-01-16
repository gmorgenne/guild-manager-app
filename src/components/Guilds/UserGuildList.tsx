import { useSession } from "next-auth/react";
import Link from "next/link";
import GuildPreview from "../../components/Guilds/GuildPreview";
import { trpc } from "../../utils/trpc";

const UserGuildList = (): JSX.Element => {
    const { data: sessionData } = useSession();
    const userGuilds = trpc.guild.getUserGuilds.useQuery({ userId: sessionData?.user?.id })?.data;

    const setSessionGuild = (guildId: string) => {
        sessionStorage.setItem("guild", guildId);
    }

    return (
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
    );
}

export default UserGuildList;