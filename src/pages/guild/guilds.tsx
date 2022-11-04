import type { Guild } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import GuildPreview from "../../components/Guilds/GuildPreview";
import { trpc } from "../../utils/trpc";

type GuildListPageProps = {
    guilds: Guild[];
}

const GuildList: NextPage<GuildListPageProps> = (props) => {
    
    return (
        <div className="guild-list">
            <h2>All Guilds:</h2>
                <div className="guilds-list flex p-4">
                {props.guilds && props.guilds.map((guild, i) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
    const guilds = trpc.guild.getAll.useQuery()?.data;

    return {
        props: {
            guilds: guilds
        }
    }
}

export default GuildList;