import type { Guild, Hero } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import GuildPreview from "../Guilds/GuildPreview";

const HeroDetail = (hero: (Hero & { guild: Guild | null })): JSX.Element => {
    const { data: sessionData } = useSession();
    const isAuthenticated = sessionData?.user != undefined;
    const mutation = trpc.hero.addHero.useMutation();
    const guildId = sessionStorage.getItem("guild") ?? "0";
    const isAvailable = isAuthenticated && hero.guildId === "0" && guildId != "0";

    const addHeroToGuild = () => {
        mutation.mutate({ guildId: guildId, heroId: hero.id });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold underline my-8 text-center">Hero Sheet</h1>
            <section className="border border-black text-center lg:flex lg:divide-x-4 divide-black bg-blue-100 rounded-t-3xl rounded-b-xl">
                <div className="lg:w-1/4">
                    <strong className="font-bold">
                        Name:
                    </strong>
                    <div className="text-2xl">
                        {hero.name}
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-4 justify-around lg:w-2/3 p-2">
                    <div>
                        <strong className="block">Level:</strong>
                        {hero.level}
                    </div>
                    <div>
                        <strong className="block">Class:</strong>
                        {hero.class}
                    </div>
                    <div>
                        <strong className="block">Subclass:</strong>
                        {hero.subclass}
                    </div>
                    {hero.race !== "Warforged" && (<div>
                        <strong className="block">Sex:</strong>
                        {hero.sex ? "Male" : "Female"}
                    </div>)}
                    <div>
                        <strong className="block">Race:</strong>
                        {hero.race}
                    </div>
                    <div>
                        <strong className="block">Alignment:</strong>
                        {hero.alignment}
                    </div>
                    <div>
                        <strong className="block">Experience:</strong>
                        {hero.experience}
                    </div>
                    <div>
                        <strong className="block">Happiness:</strong>
                        {hero.happiness}
                    </div>
                </div>
            </section>
            <section className="my-4">
                <div className="ring ring-red-600 rounded-3xl bg-red-400">
                    <div className={`ring ring-green-600 bg-green-400 text-right ${hero.maxHealthPoints > hero.healthPoints ? "rounded-l-3xl" : "rounded-3xl"}`} style={{ width: `${(hero.healthPoints / hero.maxHealthPoints) * 100}%` }}>&nbsp;</div>
                    <div className="float-right -mt-6 text-center w-full">HP: {hero.healthPoints} / {hero.maxHealthPoints}</div>
                </div>
            </section>
            <section className="grid sm:flex gap-8 my-4">
                <div className="flex flex-wrap sm:flex-col justify-center sm:justify-start gap-4">
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Strength:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {hero.strength}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Dexterity:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {hero.dexterity}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Magic:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {hero.magic}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Constitution:</div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {hero.constitution}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Resistance:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {hero.resistance}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Defense:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {hero.defense}
                        </div>
                    </div>
                </div>
                <div className="grid sm:flex sm:flex-col gap-4 sm:w-1/2">
                    {(guildId === hero.guildId || isAvailable) && (
                        <div>
                            <h3 className="text-2xl font-bold flex underline border border-black bg-slate-300 p-2 rounded-t-xl">Contract:</h3>
                            <div className="border border-black bg-slate-200 p-1">Contract Cost: {hero.contractCost}</div>
                            <div className="border border-black bg-slate-200 p-1">Contract Demands: {hero.contractDemand} days</div>
                            <div className="border border-black bg-slate-200 p-1 rounded-b">Contract Expires: {hero.contractExpiration.toLocaleDateString("en-us")}</div>
                        </div>
                    )}
                    <div>
                        <h4 className="text-2xl font-bold flex underline border border-black bg-slate-300 p-2 rounded-t-xl">Stats:</h4>
                        <div className="border border-black bg-slate-200 p-1">Kills: {hero.kills}</div>
                        <div className="border border-black bg-slate-200 p-1">Quests: {hero.successfulQuests}/{hero.attemptedQuests}</div>
                        <div className="border border-black bg-slate-200 p-1 rounded-b">Total Purse Acquired: {hero.purseAcquired}</div>
                    </div>
                </div>
                <div className="flex flex-wrap sm:flex-col justify-center sm:justify-start gap-4">
                    <div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-t-xl">
                            {hero.purse}
                        </div>
                        <div className="border border-black bg-yellow-400 w-28 h-8 text-center font-bold rounded-b-xl">
                            Purse:
                        </div>
                    </div>
                    <div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-t-xl">
                            {hero.movement}
                        </div>
                        <div className="border border-black bg-blue-400 w-28 h-8 text-center font-bold rounded-b-xl">
                            Movement:
                        </div>
                    </div>
                    <div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-t-xl">
                            {hero.speed}
                        </div>
                        <div className="border border-black bg-blue-400 w-28 h-8 text-center font-bold rounded-b-xl">
                            Speed:
                        </div>
                    </div>
                </div>
                <div>
                    {hero.guild && <GuildPreview {...hero.guild} />}
                </div>
            </section>
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