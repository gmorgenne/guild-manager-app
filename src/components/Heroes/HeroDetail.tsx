import type { Hero } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

const HeroDetail = (props: Hero): JSX.Element => {
    const isAvailable = props.guildId === "0";
    const mutation = trpc.hero.addHero.useMutation();
    const guildId = sessionStorage.getItem("guild") ?? "0";
    const [addedSuccess, setAddedSuccess] = useState(false);

    // TODO: add in contract info if available

    const addHeroToGuild = () => {
        mutation.mutate({ guildId: guildId, heroId: props.id });
        setAddedSuccess(true);
    }

    return (
        <div className="hero-detail">
            <h2>Name: {props.name}</h2>
            <div>Sex: {props.sex}</div>
            <div>Race: {props.race}</div>
            <div>Class: {props.class}</div>
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

            {isAvailable && !addedSuccess && (
                <button onClick={addHeroToGuild}>Add Hero to your Guild!</button>
            )}
            {addedSuccess && <h5>Added Successfully!</h5>}
            {guildId !== "0" && (
                <Link href={`/guild/${guildId}`}>Back to Guild</Link>
            )}
        </div>
    )
}

export default HeroDetail;