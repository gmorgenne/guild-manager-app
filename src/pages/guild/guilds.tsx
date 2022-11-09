import type { NextPage } from "next";
import GuildPreview from "../../components/Guilds/GuildPreview";
import { trpc } from "../../utils/trpc";

const GuildList: NextPage = () => {
    const guilds = trpc.guild.getAll.useQuery()?.data;
    return (
        <div className="guild-list">
            <h2>All Guilds:</h2>
            <div className="guilds-list flex p-4">
                {guilds && guilds.map((guild, i) => {
                    return (
                        <div className="guild p-4" key={i}>
                            <GuildPreview {...guild} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GuildList;