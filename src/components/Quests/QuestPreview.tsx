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
        <table className="text-center mx-auto w-full border border-slate-900">
            <caption className="border border-slate-900 bg-slate-400 rounded-t-3xl font-bold text-lg">Quest Preview</caption>
        </table>
        <div className="border border-slate-900 flex text-center p-2 bg-slate-200 gap-2">
            <div className="font-bold flex">Description:</div> {/* [ name of quest, generated as summary of encounters at location? ] */} {quest.name}
        </div>
                    <div className="bg-indigo-300 rounded-b-3xl border border-slate-900 border-separate p-2">
                    <table className="text-center w-full rounded-b-3xl">
                        <thead>
                            <tr>
                                <th className="table-cell">Municipality:</th> {/* [ base?, city, town, or village name ] */}
                                <th className="table-cell">Location:</th> {/* location of quest encounters ] */}
                                <th className="table-cell">Reward:</th> {/* gold & items (items represented as icons?) */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <div className="table-cell"> {municipality.name}</div>
                                <div className="table-cell"> {quest.location}</div>
                                <div className="table-cell bg-yellow-500 rounded-3xl"> Gold: {quest.rewardGold}</div>
                            </tr>
                        </tbody>
                    </table>
                </div>
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