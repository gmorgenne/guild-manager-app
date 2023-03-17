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
        <div>
            <h1 className="text-2xl font-bold underline my-8 text-center">Hero Sheet</h1>
            <section className="border border-black text-center lg:flex lg:divide-x-4 divide-black bg-blue-100 rounded-t-3xl rounded-b-xl">
                <div className="lg:w-1/4">
                    <strong className="font-bold">
                        Name:
                    </strong>
                    <div className="text-2xl">
                        {props.name}
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-4 justify-around lg:w-2/3">
                    <div>
                        <strong className="block">Class:</strong>
                        {props.class}
                    </div>
                    <div>
                        <strong className="block">Subclass:</strong>
                        {props.subclass}
                    </div>
                    {props.race !== "Warforged" && (<div>
                        <strong className="block">Sex:</strong>
                        {props.sex ? "Male" : "Female"}
                    </div>)}
                    <div>
                        <strong className="block">Race:</strong>
                        {props.race}
                    </div>
                    <div>
                        <strong className="block">Alignment:</strong>
                        {props.alignment}
                    </div>
                    <div>
                        <strong className="block">Experience:</strong>
                        {props.experience}
                    </div>
                    <div>
                        <strong className="block">Happiness:</strong>
                        {props.happiness}
                    </div>
                </div>
            </section>
            <section className="my-4">
                <div className="ring ring-red-600 rounded-3xl bg-red-400">
                    <div className="ring ring-green-600 bg-green-400 text-right rounded-l-3xl" style={{ width: `${(props.healthPoints / props.maxHealthPoints) * 100}%` }}>&nbsp;</div>
                    <div className="float-right -mt-6 text-center w-full">HP: {props.healthPoints} / {props.maxHealthPoints}</div>
                </div>
            </section>
            <section className="grid sm:flex gap-8 my-4">
                <div className="flex flex-wrap sm:flex-col justify-center gap-4">
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Strength:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {props.strength}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Dexterity:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {props.dexterity}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Magic:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {props.magic}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Constitution:</div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {props.constitution}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Resistance:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {props.resistance}
                        </div>
                    </div>
                    <div>
                        <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl">
                            Defense:
                        </div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">
                            {props.defense}
                        </div>
                    </div>
                </div>
                <div className="grid sm:flex sm:flex-col gap-4 sm:w-1/2">
                    {(guildId === props.guildId || isAvailable) && (
                        <div>
                            <h3 className="text-2xl font-bold flex underline border border-black bg-slate-300 p-2 rounded-t-xl">Contract:</h3>
                            <div className="border border-black bg-slate-200 p-1">Contract Cost: {props.contractCost}</div>
                            <div className="border border-black bg-slate-200 p-1">Contract Demands: {props.contractDemand} days</div>
                            <div className="border border-black bg-slate-200 p-1 rounded-b">Contract Expirations: {props.contractExpiration.toLocaleDateString("en-us")}</div>
                        </div>
                    )}
                    <div>
                        <h4 className="text-2xl font-bold flex underline border border-black bg-slate-300 p-2 rounded-t-xl">Stats:</h4>
                        <div className="border border-black bg-slate-200 p-1">Kills: {props.kills}</div>
                        <div className="border border-black bg-slate-200 p-1">Quests: {props.successfulQuests}/{props.attemptedQuests}</div>
                        <div className="border border-black bg-slate-200 p-1 rounded-b">Total Purse Acquired: {props.purseAcquired}</div>
                    </div>
                </div>
                <div className="flex flex-wrap sm:flex-col justify-center gap-4">
                    <div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-t-xl">
                            {props.purse}
                        </div>
                        <div className="border border-black bg-yellow-400 w-28 h-8 text-center font-bold rounded-b-xl">
                            Purse:
                        </div>
                    </div>
                    <div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-t-xl">
                            {props.movement}
                        </div>
                        <div className="border border-black bg-blue-400 w-28 h-8 text-center font-bold rounded-b-xl">
                            Movement:
                        </div>
                    </div>
                    <div>
                        <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-t-xl">
                            {props.speed}
                        </div>
                        <div className="border border-black bg-blue-400 w-28 h-8 text-center font-bold rounded-b-xl">
                            Speed:
                        </div>
                    </div>
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