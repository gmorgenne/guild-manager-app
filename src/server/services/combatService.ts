import type { Combatant } from "../../types/enemies";
import { getRandomInt } from "./commonService";


export const FIGHT = (group1: Combatant[], group2: Combatant[]) => {
    let battleSummary = "<h3>Battle Begins!</h3>";
    battleSummary += "<p>Group 1</p>";
    group1.forEach((combatant) => {
        battleSummary += `<p>${combatant.name}</p>`;
    });
    battleSummary += "<p>Group 2</p>";
    group2.forEach((combatant) => {
        battleSummary += `<p>${combatant.name}</p>`;
    });
    // check initiative and make turn order
    let activeCombatants: Combatant[] = [...group1, ...group2];
    activeCombatants.sort((a, b) => b.initiative - a.initiative);
    let battleCompleted = false;

    while (!battleCompleted) {
        activeCombatants.forEach((combatant) => {
            if (battleCompleted || combatant.healthPoints < 1) {
                return;
            }
            battleSummary += `<p>Start of turn: ${combatant.name}</p>`;
            const action = determineAction(combatant);
            let potentialVictory = false;
            switch (action) {
                case "attack":
                    const enemies = activeCombatants.filter((e) => { return combatant.group != e.group });
                    // TODO: perhaps attack action can target multiple?
                    const enemy = determineTarget(combatant, enemies);
                    if (!enemy) {
                        battleSummary += "<p>enemies are defeated!</p>";
                        potentialVictory = true;
                        break;
                    }
                    battleSummary += `<p>    ${combatant.name} is targeting ${enemy.name}</p>`
                    const attack = rollAttack(combatant);
                    // TODO: determine if advantage or disadvantage is taken
                    /* const chances = [attack.chance1, attack.chance2].sort((a, b) => b - a);
                    const advantage = chances[0] || attack.chance1;
                    const disadvantage = chances[1] || attack.chance2; */
                    const roll = attack.chance1;
                    let hits = false;
                    if (attack.type == "physical") {
                        battleSummary += `<p>    ${combatant.name} attempts a physical attack and rolled: ${roll} to hit vs defense: ${enemy.defense}</p>`;
                        if ((roll + attack.modifier) > enemy.defense) {
                            hits = true;
                        }
                    } else {
                        battleSummary += `<p>    ${combatant.name} attempts a magic attack and rolled: ${roll} to hit vs resistance: ${enemy.resistance}</p>`;
                        if ((roll + attack.modifier) > enemy.resistance) {
                            hits = true;
                        }
                    }
                    if (attack.isCrit) {
                        attack.damage *= 2;
                        battleSummary += `<p>    CRITICAL HIT!!!!</p>`;
                    }
                    if (hits) {
                        enemy.healthPoints -= attack.damage;
                        combatant.damageDealt += attack.damage;
                        battleSummary += `<p>    ${attack.damage} dealt to ${enemy.name}, which puts them down to ${enemy.healthPoints} hp.</p>`;
                        if (enemy.healthPoints <= 0) {
                            battleSummary += `<p>    combatant has perished: ${enemy.name}</p>`
                            activeCombatants = activeCombatants.filter((a) => { return a.healthPoints > 0 });
                            potentialVictory = true;
                            combatant.kills += 1;
                        }
                    } else {
                        if (roll === 1) {
                            const failDamage = getRandomInt(1, 12);
                            combatant.healthPoints -= failDamage
                            battleSummary += `<p>    CRITICAL FAIL!!!! ${combatant.name} takes ${failDamage} points of damage</p>`;
                        } else if (roll < 6) {
                            battleSummary += `<p>    attack missed!</p>`;
                        } else {
                            battleSummary += `<p>    attack blocked.</p>`;
                        }
                    }
                    break;
                case "heal":
                    const allies = activeCombatants.filter((e) => { return combatant.group == e.group });
                    const ally = determineTarget(combatant, allies);
                    if (!ally) {
                        break;
                    }
                    const hp = getRandomInt(1, 6) + combatant.level;
                    ally.healthPoints += hp;
                    battleSummary += `<p>    ${combatant.name} healed ${ally.name} for ${hp} points.</p>`;
                    break;
                case "hide":
                    battleSummary += `<p>    ${combatant.name} hides.</p>`;
                    break;
            }
            if (potentialVictory) {
                const remainingEnemies = activeCombatants.filter((e) => { return combatant.group != e.group });
                if (remainingEnemies.length === 0) {
                    battleCompleted = true;
                }
            }
            battleSummary += `<p>End of turn: ${combatant.name}</p>`;
        });
    }
    battleSummary += "<h5>End of Battle!!!!</h5>";
    return {
        summary: battleSummary,
        victors: activeCombatants.filter((c) => c.healthPoints > 0)
    };
};

const rollAttack = (combatant: Combatant) => {
    const chance1 = getRandomInt(1, 20);
    const chance2 = getRandomInt(1, 20);
    const isCrit = chance1 == 20;// TODO: determine if chance2 should be considered for crit || chance2 == 20;
    let modifier = 0;
    const damage = getRandomInt(1, 8) * (combatant.level || 1);
    let type = "physical";

    // determine modifier by class
    if (combatant.class == "Cleric" 
     || combatant.class == "Fighter"
     || combatant.class == "Barbarian"
     || combatant.class == "Monk"
     || combatant.class == "Paladin") {
        modifier = combatant.strength;
    }
    if (combatant.class == "Ranger"
     || combatant.class == "Rogue") {
        modifier = combatant.dexterity;
    }
    if (combatant.class == "Wizard"
     || combatant.class == "Bard"
     || combatant.class == "Druid"
     || combatant.class == "Sorcerer"
     || combatant.class == "Warlock") {
        modifier = combatant.magic;
        type = "magic";
    }
    
    return {
        chance1: chance1,
        chance2: chance2,
        isCrit: isCrit,
        damage: damage,
        modifier: modifier,
        type: type
    };
}
const determineAction = (combatant: Combatant) => {
    if (combatant.class == "Cleric")
        return "heal";
    if (combatant.class == "Rogue" && getRandomInt(0, 10) < 3) {
        return "hide"; // lolz
    }
    return "attack";
};
const determineTarget = (combatant: Combatant, targets: Combatant[]) => {
    if (combatant.class == "Barbarian") {
        targets.sort((a, b) => b.healthPoints - a.healthPoints);
    }
    return targets[0]; // pick first available target for now...
};
// combatService.FIGHT(party1, party2) 
// ^ should return object with summary: success, etc...
// if success:
//      update guild purse
//      hero experience 
//      foreach combatant, update associated hero

