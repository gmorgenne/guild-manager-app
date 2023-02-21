export type AddStaffToGuildInput = {
    guildId: string;
    staffId: string;
};

export type CreateStaffInput = {
    name: string;
    sex: boolean;
    race: string;
    jobClass: string;
    jobSpec: string;
};