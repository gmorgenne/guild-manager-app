import type { Hero } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export type HeroPreviewProps = {
    hero: Hero;
    link: boolean;
}

const Preview = (hero : Hero): JSX.Element => {
    const tableCellClass = (stat: number) => {
        let className = "table-cell tbl-cell";
        if (stat > 8) {
            className += " font-bold";
        }
        if (stat < 4) {
            className += " text-red-700";
        }
        return className;
    }
    
    return (
        <div className="border border-indigo-900 rounded-3xl">
            <div className="p-4 bg-blue-100 rounded-t-3xl">
                <div className="rounded-2xl mb-4 bg-indigo-400 p-1">
                    <h4 className="flex justify-center bg-gray-300 text-[1vw] font-bold rounded-t-xl border-2 border-black">{hero.name}</h4>
                    <div className="grid grid-cols-2 text-center">
                        <div className="bg-gray-100 border-2 border-t border-black rounded-bl-2xl">
                            <p className="border-b-2 border-black mx-2 font-bold">Race</p>
                            <p>{hero.race}</p>
                        </div>
                        <div className="bg-gray-100 border-2 border-t border-black rounded-br-xl">
                            <p className="border-b-2 border-black mx-2 font-bold">Alignment</p>
                            <p>{hero.alignment}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Image src="https://via.placeholder.com/100?text=Hero" alt="hero preview thumbnail" className="m-auto" height={120} width={100} />
                </div> 
            </div>
            <div className="bg-red-500">
                <div className="bg-green-500 text-right" style={{ width: `${ (hero.healthPoints / hero.maxHealthPoints) * 100 }%`}}>&nbsp;</div>
                <div className="float-right -mt-6 text-center w-full">{hero.healthPoints} / {hero.maxHealthPoints}</div>
            </div>
            <div className="bg-indigo-400 rounded-b-3xl">
                <table className="text-center mx-auto w-full border border-indigo-900 border-separate rounded-b-3xl">
                    <caption className="border border-indigo-900 font-bold">Level: {hero.level} - {hero.class} ({hero.subclass})</caption>
                    <thead>
                        <tr>
                            <th className="table-cell tbl-cell">Str</th>
                            <th className="table-cell tbl-cell">Dex</th>
                            <th className="table-cell tbl-cell">Mag</th>
                            <th className="table-cell tbl-cell">Con</th>
                            <th className="table-cell tbl-cell">Def</th>
                            <th className="table-cell tbl-cell">Res</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={tableCellClass(hero.strength) + " rounded-bl-3xl"}>{hero.strength}</td>
                            <td className={tableCellClass(hero.dexterity)}>{hero.dexterity}</td>
                            <td className={tableCellClass(hero.magic)}>{hero.magic}</td>
                            <td className={tableCellClass(hero.constitution)}>{hero.constitution}</td>
                            <td className={tableCellClass(hero.defense)}>{hero.defense}</td>
                            <td className={tableCellClass(hero.resistance) + " rounded-br-3xl"}>{hero.resistance}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const HeroPreview = ({ hero, link } : HeroPreviewProps): JSX.Element => {
    return (
        <>
        {link ?
            <Link  href={`/heroes/${hero.id}`}>
                <Preview {...hero} />
            </Link>
            :
            <Preview {...hero} />
        }
        </>
    )
}

export default HeroPreview;