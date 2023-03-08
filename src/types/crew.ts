export type AddStaffToCrewInput = {
    staffId: string;
    crewId: string;
};
export type CreateCrewInput = {
    guild: string;
    staffIds: string[];
    name: string;
};