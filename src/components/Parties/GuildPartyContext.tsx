import type { Hero, Party, Quest } from "@prisma/client";
import type { Dispatch, SetStateAction} from "react";
import { createContext, useState , useRef} from "react";
import type { CreatePartyInput, UpdatePartyInput } from "../../types/party";
import { trpc } from "../../utils/trpc";

export interface IGuildPartyContext {
    availableHeroes: Hero[];
    createParty: ({}: CreatePartyInput) => void;
    deleteParty: (partyId: string) => void;
    editingParty?: (Party & { heroes: Hero[]; quest: Quest | null }) | undefined;
    guildId: string;
    parties: (Party & { heroes: Hero[]; quest: Quest | null })[] | undefined;
    renameParty: (partyId: string, newName: string) => {status: boolean; newName: string};
    setEditingParty: Dispatch<SetStateAction<(Party & {
        heroes: Hero[];
        quest: Quest | null;
    }) | undefined>>;
    scrollToBottom: () => void;
    updateParty: ({}: UpdatePartyInput) => void;
}

const defaultGuildParty: IGuildPartyContext = {
    availableHeroes: [],
    createParty: ({}) => { console.log('create party'); },
    guildId: "",
    parties: [],
    deleteParty: (partyId) => { console.log('partyId: ', partyId); },
    renameParty: (partyId, newName) => { console.log('partyId: ', partyId); return { status: false, newName: newName }; },
    setEditingParty: () => { return {}; },
    scrollToBottom: () => { console.log('scrollToBottom'); },
    updateParty: ({}) => { console.log('update party'); }
};

export const GuildPartyContext = createContext(defaultGuildParty);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GuildPartyContextProvider = ({ children, guildId }: any) => {
    const heroes = trpc.hero.getHeroesByGuild.useQuery({ id: guildId })?.data;
    const parties = trpc.party.getPartiesByGuildId.useQuery({ id: guildId })?.data;
    const availableHeroes = heroes?.filter((hero) => { return hero.partyId == null }) ?? [];
    const [editingParty, setEditingParty] = useState<(Party & { heroes: Hero[]; quest: Quest | null }) | undefined>();
    const [guildParties, setGuildParties] = useState<(Party & { heroes: Hero[]; quest: Quest | null })[]>(parties || []);
    const createPartyMutation = trpc.party.createParty.useMutation();
    const deletePartyMutation = trpc.party.deleteParty.useMutation();
    const renamePartyMutation = trpc.party.renameParty.useMutation();
    const updatePartyMutation = trpc.party.updateParty.useMutation();
    const bottomDiv = useRef<HTMLDivElement | null>(null);

    const createParty = ({ compatibility, guild, heroIds, name, quest }: CreatePartyInput) => {
        createPartyMutation.mutate({
            compatibility: compatibility,
            guild: guild,
            heroIds: heroIds || [],
            name: name,
            quest: quest
        });
    };
    const deleteParty = (partyId: string) => {
        const updatedParties = guildParties.filter((party) => party.id != partyId);
        setGuildParties(updatedParties);
        deletePartyMutation.mutate(partyId);
    };
    const renameParty = (partyId: string, newName: string) => {
        renamePartyMutation.mutate({ id: partyId, name: newName });
        return {
            status: renamePartyMutation.isSuccess,
            newName: newName
        }
        //  TODO: determine if we need to update the context parties or does it redraw because renameParty has been called?
    };
    const scrollToBottom = () => {
        bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
    };
    const updateParty = ({ compatibility, heroIds, id }: UpdatePartyInput) => {
        const party = guildParties.find((party) => party.id == id);
        if (!party) return;
        const partyHeroIds = party.heroes?.map((hero) => hero.id);
        const heroesToRemove = party.heroes?.filter((hero) => heroIds.indexOf(hero.id) === -1).map((hero) => hero.id);
        const heroesToAdd = heroIds.filter((id) => partyHeroIds.indexOf(id) === -1);
        updatePartyMutation.mutate({
            addHeroIds: heroesToAdd,
            compatibility: compatibility,
            id: id,
            removeHeroIds: heroesToRemove
        });
    };

    return(
        <GuildPartyContext.Provider value={{
            availableHeroes: availableHeroes,
            createParty: createParty,
            deleteParty: deleteParty,
            editingParty: editingParty,
            guildId: guildId,
            parties: guildParties,
            renameParty: renameParty,
            setEditingParty: setEditingParty,
            scrollToBottom: scrollToBottom,
            updateParty: updateParty
        }}>
            {children}
            <div ref={bottomDiv}></div>
        </GuildPartyContext.Provider>
    );
};

export default GuildPartyContextProvider;