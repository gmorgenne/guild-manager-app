import type { Guild } from "@prisma/client";

const GuildPreview = (guild: Guild): JSX.Element => {
    return (
        <div className="guild-preview">
            <div className="guild-name">Guild Name: {guild.name}</div>
            <div className="guild-id">Guild id: {guild.id}</div>
            <div className="guild-primary-color">Guild primary color: {guild.primaryColor}</div>
            <div className="guild-secondary-color">Guild secondary color: {guild.secondaryColor}</div>
        </div>
    )
}

export default GuildPreview;