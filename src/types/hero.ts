export type AddHeroToGuildInput = {
    guildId: string;
    heroId: string;
};
export type CreateHeroInput = {
    name: string;
    sex: boolean;
    race: string;
    class: string;
    subclass: string;
    guild: string;
    alignment: string;
    healthPoints: number;
    strength: number;
    dexterity: number;
    magic: number;
    constitution: number;
    resistance: number;
    defense: number;
    movement: number;
    speed: number;
    purse: number;
};
export const LevelUpMap = new Map<number, number>();
LevelUpMap.set(1, 100);
LevelUpMap.set(2, 225);
LevelUpMap.set(3, 400);
LevelUpMap.set(4, 900);
LevelUpMap.set(5, 1500);