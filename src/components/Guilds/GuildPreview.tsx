import type { Guild } from "@prisma/client";

const GuildPreview = (guild: Guild): JSX.Element => {
    return (
        <div className="guild-preview p-4">
            <div className="guild-name text-left">Name: {guild.name}</div>
            <div className="guild-id">ID: {guild.id}</div>
            <div className="guild-primary-color flex justify-between">
                <span>Primary: {guild.primaryColor}</span>
                <div className="ml-2 border border-black" style={{backgroundColor: guild.primaryColor, width: 25}}>&nbsp;</div>
            </div>
            <div className="guild-secondary-color flex justify-between">
                <span>Secondary: {guild.secondaryColor} </span>
                <div className="ml-2 border border-black" style={{backgroundColor: guild.secondaryColor, width: 25}}>&nbsp;</div>
            </div>
        </div>
    )
}

export default GuildPreview;