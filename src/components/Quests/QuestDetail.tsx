import type { Encounter, Municipality, Quest } from "@prisma/client";

export type QuestDetailProps = {
    quest: Quest;
    encounters: Encounter[];
    municipality: Municipality
}

const QuestDetail = ({ quest, encounters, municipality }: QuestDetailProps): JSX.Element => {

    return (
        <>
            <section>
                <h1 className="text-2xl font-bold flex underline">Quest Preview</h1>
                <div className="text-l font-bold flex">Description:</div>{quest.name}
                <div className="text-l font-bold flex">Municipality:</div>{municipality.name}
                <div className="text-l font-bold flex">Location:</div>{quest.location}
                <div className="text-l font-bold flex">Reward:</div><div className="flex"> Gold: {quest.rewardGold}</div>
                <div className="text-l font-bold flex">Reward items:</div>{quest.rewardItems}
            </section>
            <section>
                {encounters.some((e) => e.enemies > 0) && <p>Scouting reports show that there could be some enemies on this quest.</p>}
                {/* TODO: DELETE THIS SECTION, IT IS FOR TESTING PURPOSES UNTIL QUESTS ARE BALANCED PROPERLY */
                    encounters && encounters.map((encounter, i) => {
                        return (
                            <div key={i}>
                                severity: {encounter.severity}
                                # enemies: {encounter.enemies}
                            </div>
                        )
                    })
                }
            </section>
        </>);
}

export default QuestDetail;