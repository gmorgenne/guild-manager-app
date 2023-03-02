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