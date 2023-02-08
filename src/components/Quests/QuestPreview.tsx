import type { Quest } from "@prisma/client";
import Link from "next/link";

export type QuestPreviewProps = {
    quest: Quest;
    link: boolean;
}

const Preview = (quest: Quest): JSX.Element => {

    return (
        <>
        Quest Preview

        name: {/* [ name of quest, generated as summary of encounters at location? ] */} {quest.name}
        <br /><br />
        municipality: {/* [ base?, city, town, or village name ] */} {quest.municipalityId}
        <br /><br />
        location: {/* [ location of quest encounters ] */} {quest.location}
        <br /><br />
        reward: {/* gold & items (items represented as icons?) */} Gold: {quest.rewardGold}
        </>
    );
};

const QuestPreview = ({quest, link}: QuestPreviewProps) : JSX.Element => {
    return (
        <>
        {link ? 
            <Link href={`/quests/${quest.id}`}>
                <Preview {...quest} />    
            </Link>
            :
            <Preview {...quest} />
        }
        </>
        
    );
}

export default QuestPreview;