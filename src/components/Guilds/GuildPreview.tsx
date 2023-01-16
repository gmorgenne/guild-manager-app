import type { Guild } from "@prisma/client";
import GuildBadge from "../Badges/GuildBadge";

const GuildPreview = (guild: Guild): JSX.Element => {
    return (
        <div className="guild-preview max-w-xs p-4">
            <div className="guild-name text-left">Name: {guild.name}</div>
            <div className="guild-primary-color flex justify-between">
                <span>Primary:</span>
                <div className="ml-2 border border-black" style={{backgroundColor: guild.primaryColor, width: 25}}>&nbsp;</div>
            </div>
            <div className="guild-secondary-color flex justify-between">
                <span>Secondary:</span>
                <div className="ml-2 border border-black" style={{backgroundColor: guild.secondaryColor, width: 25}}>&nbsp;</div>
            </div>
            <div className="mx-auto w-20 h-20">
                <GuildBadge PrimaryColor={guild.primaryColor} SecondaryColor={guild.secondaryColor} Index={guild.badge} />
            </div>
        </div>
    )
}

export default GuildPreview;