export type AddHeroToPartyInput = {
    heroId: string;
    partyId: string;
};
export type CreatePartyInput = {
    compatibility: number;
    guild: string;
    heroIds: string[];
    name: string;
    quest?: string | null | undefined;
};
export type UpdatePartyInput = {
    compatibility: number;
    heroIds: string[];
    id: string;
}