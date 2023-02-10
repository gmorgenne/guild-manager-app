import type { Municipality, Quest } from "@prisma/client";
import Link from "next/link";

export type QuestPreviewProps = {
    quest: Quest;
    link: boolean;
    municipality: Municipality;
}

const Preview = ({quest, municipality}: QuestPreviewProps): JSX.Element => {

    return (
        <>
        Quest Preview
        <br /><br />
        name: {/* [ name of quest, generated as summary of encounters at location? ] */} {quest.name}
        <br /><br />
        municipality: {/* [ base?, city, town, or village name ] */} {municipality.name}
        <br /><br />
        location: {/* [ location of quest encounters ] */} {quest.location}
        <br /><br />
        reward: {/* gold & items (items represented as icons?) */} Gold: {quest.rewardGold}
        </>
    );
};

const QuestPreview = (props: QuestPreviewProps) : JSX.Element => {
    return (
        <>
        {props.link ? 
            <Link href={`/quests/${props.quest.id}`}>
                <Preview {...props} />    
            </Link>
            :
            <Preview {...props} />
        }
        </>
        
    );
}

export default QuestPreview;