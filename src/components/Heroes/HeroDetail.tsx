import type { Hero } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

const HeroDetail = (props: Hero): JSX.Element => {
    const { data: sessionData } = useSession();
    const isAuthenticated = sessionData?.user != undefined;
    const mutation = trpc.hero.addHero.useMutation();
    const guildId = sessionStorage.getItem("guild") ?? "0";
    const isAvailable = isAuthenticated && props.guildId === "0" && guildId != "0";
    
    const addHeroToGuild = () => {
        mutation.mutate({ guildId: guildId, heroId: props.id });
    }

    return (
        <div className="hero-detail">
            <h1 className="text-2xl font-bold flex underline">Hero Info</h1>
            <div>Name: {props.name}</div>
            <div>Sex: {props.sex ? "Male" : "Female"}</div>
            <div>Race: {props.race}</div>
            <div>Class: {props.class}</div>
            <div>Subclass: {props.subclass}</div>
            <div>Alignment: {props.alignment}</div>
            <div>Health Points: {props.healthPoints}</div>
            <div>Strength: {props.strength}</div>
            <div>Dexterity: {props.dexterity}</div>
            <div>Magic: {props.magic}</div>
            <div>Constitution: {props.constitution}</div>
            <div>Resistance: {props.resistance}</div>
            <div>Defense: {props.defense}</div>
            <div>Movement: {props.movement}</div>
            <div>Speed: {props.speed}</div>
            <div>Purse: {props.purse}</div>
            <div>Happiness: {props.happiness}</div>

            {(guildId === props.guildId || isAvailable) && (
                <div>
                    <div>Contract Cost: {props.contractCost}</div>
                    <div>Contract Demands: {props.contractDemand} days</div>
                    <div>Contract Expirations: {props.contractExpiration.toLocaleDateString("en-us")}</div>
                </div>
            )}
            <div>
                <h4>Stats:</h4>
                <div>Kills: {props.kills}</div>
                <div>Successful Quests: {props.successfulQuests}</div>
                <div>Total Purse Acquired: {props.purseAcquired}</div>
            </div>

            <div className="flex">
                {isAvailable && !mutation.isSuccess && (
                    <button className="btn" onClick={addHeroToGuild}>Add Hero to your Guild!</button>
                )}
                {mutation.isSuccess && <button disabled={true} className="btn success">Added Successfully!</button>}
                {guildId !== "0" && (
                    <Link href={`/guild/${guildId}`} className="btn">Back to Guild</Link>
                )}
            </div>
        </div>
    )
}

export default HeroDetail;