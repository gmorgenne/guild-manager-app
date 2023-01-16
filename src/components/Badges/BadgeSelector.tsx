import ApertureBadge from "./ApertureBadge";
import BowtieBadge from "./BowtieBadge";
import NuclearBadge from "./NuclearBadge";
import PlanetBadge from "./PlanetBadge";
import type { BadgeSelectorProps } from "./types";

const BadgeSelector = ({PrimaryColor, SecondaryColor, SelectedIndex, selectBadge}: BadgeSelectorProps) : JSX.Element => {

    return (
        <>
            <h4>Badge Selector</h4>
            <div className="container flex gap-4">
                <div className={`badge w-16 h-16${SelectedIndex == 0 ? ' selected' : ''}`} onClick={() => selectBadge(0)}>
                    <ApertureBadge PrimaryColor={PrimaryColor} SecondaryColor={SecondaryColor} />
                </div>
                <div className={`badge w-16 h-16${SelectedIndex == 1 ? ' selected' : ''}`} onClick={() => selectBadge(1)}>
                    <BowtieBadge PrimaryColor={PrimaryColor} SecondaryColor={SecondaryColor} />
                </div>
                <div className={`badge w-16 h-16${SelectedIndex == 2 ? ' selected' : ''}`} onClick={() => selectBadge(2)}>
                    <NuclearBadge PrimaryColor={PrimaryColor} SecondaryColor={SecondaryColor} />
                </div>
                <div className={`badge w-16 h-16${SelectedIndex == 3 ? ' selected' : ''}`} onClick={() => selectBadge(3)}>
                    <PlanetBadge PrimaryColor={PrimaryColor} SecondaryColor={SecondaryColor} />
                </div>
            </div>
        </>
    )
};
export default BadgeSelector;