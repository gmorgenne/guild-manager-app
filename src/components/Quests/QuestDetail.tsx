import type { Encounter, Municipality, Quest } from "@prisma/client";

export type QuestDetailProps = {
    quest: Quest;
    encounters: Encounter[];
    municipality: Municipality
}

const QuestDetail = ({ quest, encounters, municipality } : QuestDetailProps) : JSX.Element => {

    return (
        <>
            Quest Detail
            <br /><br />
            name: {/* [ name of quest, generated as summary of encounters? ] */} {quest.name}
            <br /><br />
            giver: {/* [ random name of municipality resident ] */} {quest.giver}
            <br /><br />
            municipality: {/* [ base?, city, town, or village name ] */} {municipality.name}
            <br /><br />
            location: {/* [ location of quest encounters ] {quest.location} */} {quest.location}
            <br /><br />
            reward gold: {/* [ gold received if quest is completed ] */} {quest.rewardGold}
            <br /><br />
            reward items: {/* [ items received if quest is completed ] */}
            <br /><br />
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
            <>
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
            </>
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
            <>
            {/* 
            to determine success of quest by party, roll for each of these
            (any fail will result in quest fail):
            1. find [ giver ] in [ municipality ]
            2. travel to [ location ]
            3. foreach encounter: [ attempt to complete encounter ]
            4. return to [ giver ] to claim reward

            if fail, roll to return based on party skill/compatibility/level vs quest severity 
            */}
            </>
        </>
    );
}

export default QuestDetail;