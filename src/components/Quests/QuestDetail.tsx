import type { Encounter, Municipality, Quest } from "@prisma/client";

export type QuestDetailProps = {
    quest: Quest;
    encounters: Encounter[];
    municipality: Municipality
}

const QuestDetail = ({ quest, encounters, municipality } : QuestDetailProps) : JSX.Element => {

    return   (
        <section>
        <h1 className="text-2xl font-bold flex underline">Quest Preview</h1>
        <div className="text-l font-bold flex">Description:</div> {/* [ name of quest, generated as summary of encounters at location? ] */} {quest.name}
        <div className="text-l font-bold flex">Municipality:</div> {/* [ base?, city, town, or village name ] */} {municipality.name}
        <div className="text-l font-bold flex">Location:</div> {/* [ location of quest encounters ] */} {quest.location}
        <div className="text-l font-bold flex">Reward:</div> {/* gold & items (items represented as icons?) */} <div className="flex"> Gold: {quest.rewardGold}</div>
        <div className="text-l font-bold flex">Reward items:</div> {/* [ items received if quest is completed ] */}
        </section>
            );
            {/* encounters: (not displayed on the page directly, but are the different challenges to complete the quest) */}
            {encounters && encounters.map((encounter, i) => {
                return (
                    <div key={i}>
                        severity: {encounter.severity}
                        # enemies: {encounter.enemies}
                    </div>
                )
            })}

            {/* examples: */}
            {/* 
            Quest Name: Defeat goblins that have taken over local brewery
            Giver: Brewmanchu
            Municipality: Vordim City
            Location: Brewery on southern bank of the river outside Vordim City
            Summary: Brewmanchu and his brewing monk buddies were forced out of their brewery by some goblins.
                        Defeat the goblins and Bremanchu will offer a reward of 100 gold and 3 legendary lagers.
            Encounters: 
                - find giver
                - travel to brewery
                - defeat goblins
                - return to giver
            */}
            <>
            {/*
            Quest Name: Return a stolen item
            Giver: Durwald
            Municipality: Womdra City
            Location: cave in the woods by nearby mountains
            Summary: Durwald recently had a precious family heirloom stolen from him by some bandits that hang out in a cave.
                        Defeat the bandits, retreive the stolen item and return it to Durwald for a reward of 250 gold and 4 health potions.
            Encounters: 
                - find giver
                - travel to cave
                - defeat bandits
                - (solve puzzle/pick lock/etc...) to find the stolen item
                - (based on party alignment or compatibility) diplomacy or fight thief on return
                - return to giver
            */}
            </>


            {/* template for quest: */}
            <>
            {/* 
            Quest Name:
            Giver:
            Municipality:
            Location:
            Summary:
            Encounters: 
                - find giver
                - travel to [location]
                - return to giver 
            */}
            </>

            {/* more notes: */}
            {/* 
            to determine success of quest by party, roll for each of these
            (any fail will result in quest fail):
            1. find [ giver ] in [ municipality ]
            2. travel to [ location ]
            3. foreach encounter: [ attempt to complete encounter ]
            4. return to [ giver ] to claim reward

            if fail, roll to return based on party skill/compatibility/level vs quest severity 
            */}
}

export default QuestDetail;