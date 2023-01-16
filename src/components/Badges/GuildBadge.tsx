import ApertureBadge from "./ApertureBadge";
import BowtieBadge from "./BowtieBadge";
import NuclearBadge from "./NuclearBadge";
import PlanetBadge from "./PlanetBadge";
import type { IBadge } from "./types";

const GuildBadge = ({Index, PrimaryColor, SecondaryColor}: IBadge) : JSX.Element => {
    switch (Index) {
        case 0: return <ApertureBadge PrimaryColor={PrimaryColor} SecondaryColor={SecondaryColor} />
        case 1: return <BowtieBadge PrimaryColor={PrimaryColor} SecondaryColor={SecondaryColor} />
        case 2: return <NuclearBadge  PrimaryColor={PrimaryColor} SecondaryColor={SecondaryColor} />
        case 3: return <PlanetBadge PrimaryColor={PrimaryColor} SecondaryColor={SecondaryColor} />
        default: return <>Badge</>
    }
};

export default GuildBadge;