export type Enemy = {
    name: string;
    class: string;
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
    class: "Rogue",
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
    class: "Monk",
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
    class: "Fighter",
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
    class: "Paladin",
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
const troll: Enemy = {
    name: "Troll",
    class: "Fighter",
    level: 3,
    healthPoints: 42,
    strength: 12,
    dexterity: 6,
    magic: 2,
    constitution: 12,
    resistance: 9,
    defense: 15,
    movement: 25,
    speed: 8
};
const acolyte: Enemy = {
    name: "Acolyte",
    class: "Wizard",
    level: 3,
    healthPoints: 24,
    strength: 2,
    dexterity: 2,
    magic: 14,
    constitution: 8,
    resistance: 12,
    defense: 8,
    movement: 30,
    speed: 10
};

export const Enemies = new Map<number, Enemy[]>();
Enemies.set(1, [snake, wolf]);
Enemies.set(2, [bandit, walrus]);
Enemies.set(3, [troll, acolyte]);