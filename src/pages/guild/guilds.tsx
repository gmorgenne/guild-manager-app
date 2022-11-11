import type { NextPage } from "next";
import GuildPreview from "../../components/Guilds/GuildPreview";
import { trpc } from "../../utils/trpc";

const GuildList: NextPage = () => {
    const guilds = trpc.guild.getAll.useQuery()?.data;
    return (
        <div className="guild-list">
            <h1 className="text-2xl my-8">All Guilds</h1>
            <div className="cards">
                {guilds && guilds.map((guild, i) => {
                    return (
                        <div className="card" key={i}>
                            <GuildPreview {...guild} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GuildList;