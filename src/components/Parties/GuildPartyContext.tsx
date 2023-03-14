import type { Hero, Party, Quest } from "@prisma/client";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import type { CreatePartyInput, UpdatePartyInput } from "../../types/party";
import { trpc } from "../../utils/trpc";

export interface IGuildPartyContext {
    availableHeroes: Hero[];
    createParty: ({}: CreatePartyInput) => void;
    deleteParty: (partyId: string) => void;
    editingParty?: (Party & { heroes: Hero[]; quest: Quest | null }) | undefined;
    guildId: string;
    parties: (Party & { heroes: Hero[]; quest: Quest | null })[] | undefined;
    partyBuilderRef: RefObject<HTMLDivElement>;
    renameParty: (partyId: string, newName: string) => void;
    setAvailableHeroes: Dispatch<SetStateAction<Hero[]>>;
    setEditingParty: Dispatch<SetStateAction<(Party & {
        heroes: Hero[];
        quest: Quest | null;
    }) | undefined>>;
    updateParty: ({ }: UpdatePartyInput) => void;
}

const defaultGuildParty: IGuildPartyContext = {
    availableHeroes: [],
    createParty: ({}) => { console.log('create party'); },
    guildId: "",
    parties: [],
    partyBuilderRef: { current: null },
    deleteParty: (partyId) => { console.log('partyId: ', partyId); },
    renameParty: (partyId, newName) => { console.log(`partyId: ${partyId} newName: ${newName}`); },
    setAvailableHeroes: () => { return [] },
    setEditingParty: () => { return {}; },
    updateParty: ({}) => { console.log('update party'); }
};

type GuildPartyContextProps = {
    children: string | ReactNode | JSX.Element | JSX.Element[]
    guildId: string;
    partyBuilderRef: RefObject<HTMLDivElement>;
}

export const GuildPartyContext = createContext(defaultGuildParty);

const GuildPartyContextProvider = ({ children, guildId, partyBuilderRef }: GuildPartyContextProps) => {
    const heroesQuery = trpc.hero.getHeroesByGuild.useQuery({ id: guildId });
    const heroes = heroesQuery?.data;
    const partiesQuery = trpc.party.getPartiesByGuildId.useQuery({ id: guildId });
    const parties = partiesQuery?.data;
    const [availableHeroes, setAvailableHeroes] = useState<Hero[]>(heroes?.filter((hero) => { return hero.partyId == null }) || []);
    const [editingParty, setEditingParty] = useState<(Party & { heroes: Hero[]; quest: Quest | null }) | undefined>();
    const [guildParties, setGuildParties] = useState<(Party & { heroes: Hero[]; quest: Quest | null })[]>(parties || []);
    const createPartyMutation = trpc.party.createParty.useMutation({
        onSuccess: () => {
            partiesQuery.refetch();
            heroesQuery.refetch();
        }
    });
    const deletePartyMutation = trpc.party.deleteParty.useMutation({
        onSuccess: () => {
            partiesQuery.refetch();
            heroesQuery.refetch();
        }
    });
    const renamePartyMutation = trpc.party.renameParty.useMutation({
        onSuccess: () => {
            partiesQuery.refetch();
        }
    });
    const updatePartyMutation = trpc.party.updateParty.useMutation({
        onSuccess: () => {
            partiesQuery.refetch();
            heroesQuery.refetch();
        }
    });

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
        deletePartyMutation.mutate(partyId);
    };
    const renameParty = (partyId: string, newName: string) => {
        if (newName.length === 0) return;
        renamePartyMutation.mutate({ id: partyId, name: newName });
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

    useEffect(() => {
        if (parties) {
            setGuildParties(parties);
        }
    }, [parties]);

    useEffect(() => {
        if (heroes) {
            setAvailableHeroes(heroes?.filter((hero) => { return hero.partyId == null }) || []);
        }
    }, [heroes]);

    return (
        <GuildPartyContext.Provider value={{
            availableHeroes: availableHeroes,
            createParty: createParty,
            deleteParty: deleteParty,
            editingParty: editingParty,
            guildId: guildId,
            parties: guildParties,
            partyBuilderRef: partyBuilderRef,
            renameParty: renameParty,
            setAvailableHeroes: setAvailableHeroes,
            setEditingParty: setEditingParty,
            updateParty: updateParty
        }}>
            {children}
        </GuildPartyContext.Provider>
    );
};

export default GuildPartyContextProvider;