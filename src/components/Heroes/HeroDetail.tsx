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
            <h1 className="text-2xl font-bold flex underline">Hero Sheet</h1>
            <section className="border flex border-black bg-blue-100 rounded-t-3xl rounded-b-xl">
            <div className="border border-black flex p-2 justify-around bg-blue-100 rounded-tl-3xl rounded-bl-xl w-1/3"><div className="font-bold">Name: </div> <div className="text-2xl">{props.name}</div></div>
                <table>
                    <thead>
                        <tr className="flex underline">
                            <th>Class:</th>
                            <th>Subclass:</th>
                            <th>Guild:</th>
                            <th>Guild Manager:</th>
                            <th>Sex:</th>
                            <th>Race:</th>
                            <th>Alignment:</th>
                            <th>Experience:</th>
                            <th>Happiness:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.class} Lvl {props.level}</td>
                            <td>{props.subclass}</td>
                            <td>{/* {props.guild} */}</td>
                            <td>{props.sex ? "Male" : "Female"}</td>
                            <td>{props.race}</td>
                            <td>{props.alignment}</td>
                            <td>{props.experience}</td>
                            <td>{props.happiness}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <br></br>
            <section>
            <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl"> Strength:</div><div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">{props.strength}</div>
            <br></br>
            <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl"> Dexterity:</div><div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">{props.dexterity}</div>
            <br></br>
            <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl"> Magic:</div><div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">{props.magic}</div>
            <br></br>
            <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl"> Constitution:</div><div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">{props.constitution}</div>
            <br></br>
            <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl"> Resistance:</div><div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">{props.resistance}</div>
            <br></br>
            <div className="border border-black bg-indigo-400 w-28 h-8 text-center font-bold rounded-t-xl"> Defense:</div><div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-b-xl">{props.defense}</div>
            </section>
            <div className="ring ring-red-600 rounded-3xl justify-center flex bg-red-300">HP: {props.healthPoints}</div>
            <br></br>
            <div className="ring ring-yellow-600 rounded-3xl justify-center flex bg-yellow-300">Purse: {props.purse}</div>
            <br></br>
            <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-t-xl"> {props.movement}</div><div className="border border-black bg-blue-400 w-28 h-8 text-center font-bold rounded-b-xl">Movement:</div>
            <br></br>
            <div className="border border-black font-bold bg-slate-200 p-4 w-28 h-20 text-center text-4xl rounded-t-xl"> {props.speed}</div><div className="border border-black bg-blue-400 w-28 h-8 text-center font-bold rounded-b-xl">Speed:</div>
            <br></br>

            {(guildId === props.guildId || isAvailable) && (
                <div>
                    <h3 className="text-2xl font-bold flex underline border border-black bg-slate-300 p-2 rounded-t-xl">Contract:</h3>
                    <div className="border border-black bg-slate-200 p-1">Contract Cost: {props.contractCost}</div>
                    <div className="border border-black bg-slate-200 p-1">Contract Demands: {props.contractDemand} days</div>
                    <div className="border border-black bg-slate-200 p-1 rounded-b">Contract Expirations: {props.contractExpiration.toLocaleDateString("en-us")}</div>
                </div>
            )}
            <div>
                <br></br>
                <h4 className="text-2xl font-bold flex underline border border-black bg-slate-300 p-2 rounded-t-xl">Stats:</h4>
                <div className="border border-black bg-slate-200 p-1">Kills: {props.kills}</div>
                <div className="border border-black bg-slate-200 p-1">Successful Quests: {props.successfulQuests}</div>
                <div className="border border-black bg-slate-200 p-1 rounded-b">Total Purse Acquired: {props.purseAcquired}</div>
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