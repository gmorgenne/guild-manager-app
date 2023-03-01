export type Enemy = {
    name: string;
    enemyType: string;
    level: number;
    healthPoints: number;
    strength: number;
    dexterity: number;
    magic: number;
    constitution: number;
    resistance: number;
    defense: number;
    movement: number;
    speed: number;
};
export type Combatant = Enemy & {
    alignment: string;
    damageDealt: number;
    id?: string | undefined;
    initiative: number;
    group: number;
    kills: number;
    purse: number;
};

/* Enemy Types */
const snake: Enemy = {
    name: "Snake",
    enemyType: "Beast",
    level: 1,
    healthPoints: 12,
    strength: 4,
    dexterity: 4,
    magic: 2,
    constitution: 2,
    resistance: 2,
    defense: 1,
    movement: 30,
    speed: 12
};
const wolf: Enemy = {
    name: "Wolf",
    enemyType: "Beast",
    level: 1,
    healthPoints: 16,
    strength: 6,
    dexterity: 4,
    magic: 3,
    constitution:6,
    resistance: 1,
    defense: 4,
    movement: 35,
    speed: 10
};
const bandit: Enemy = {
    name: "Bandit",
    enemyType: "Humanoid",
    level: 2,
    healthPoints: 20,
    strength: 5,
    dexterity: 4,
    magic: 1,
    constitution: 4,
    resistance: 2,
    defense: 5,
    movement: 30,
    speed: 10
};
const walrus: Enemy = {
    name: "Walrus",
    enemyType: "Beast",
    level: 2,
    healthPoints: 20,
    strength: 8,
    dexterity: 2,
    magic: 8,
    constitution: 10,
    resistance: 6,
    defense: 10,
    movement: 10,
    speed: 8
};

export const Enemies = new Map<number, Enemy[]>();
Enemies.set(1, [snake, wolf]);
Enemies.set(2, [bandit, walrus]);