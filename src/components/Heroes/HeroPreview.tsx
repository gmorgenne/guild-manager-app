import type { Hero } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export type HeroPreviewProps = {
    hero: Hero;
    link: boolean;
}

const Preview = (hero : Hero): JSX.Element => {
    const tableCellClass = (stat: number) => {
        let className = "table-cell";
        if (stat > 17) {
            className += " font-bold";
        }
        if (stat < 11) {
            className += " text-red-400";
        }
        return className;
    }
    
    return (
        <>
            <div className="flex justify-between p-4 bg-white">
                <div className="mr-4 bg-yellow-100 p-1">
                    <div className="flex justify-between">Level: <span>{hero.level}</span></div>
                    <div className="flex justify-between">Race: <span>{hero.race}</span></div>
                    <div className="flex justify-between">Class: <span>{hero.class}</span></div>
                    <div className="flex justify-between">Alignment: <span className="ml-1">{hero.alignment}</span></div>
                </div>
                <Image src="https://via.placeholder.com/100?text=Hero" alt="hero preview thumbnail" height={120} width={100} />
            </div>
            <div className="bg-gray-300">
                <table className="text-center mx-auto w-full border border-red-900 border-separate">
                    <caption className="text-lg my-2">{hero.name}</caption>
                    <thead>
                        <tr>
                            <th className="table-cell">Str</th>
                            <th className="table-cell">Dex</th>
                            <th className="table-cell">Mag</th>
                            <th className="table-cell">Con</th>
                            <th className="table-cell">Def</th>
                            <th className="table-cell">Res</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={tableCellClass(hero.strength)}>{hero.strength}</td>
                            <td className={tableCellClass(hero.dexterity)}>{hero.dexterity}</td>
                            <td className={tableCellClass(hero.magic)}>{hero.magic}</td>
                            <td className={tableCellClass(hero.constitution)}>{hero.constitution}</td>
                            <td className={tableCellClass(hero.defense)}>{hero.defense}</td>
                            <td className={tableCellClass(hero.resistance)}>{hero.resistance}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
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