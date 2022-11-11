import type { Hero } from "@prisma/client";
import Link from "next/link";

const HeroPreview = (props: Hero): JSX.Element => {
    return (
        <Link  href={`/heroes/${props.id}`}>
            <div className="flex justify-between p-4">
                <div className="mr-4 bg-yellow-100">
                    <div>Level: {props.level}</div>
                    <div>Race: {props.race}</div>
                    <div>Class: {props.class}</div>
                </div>
                <img src="https://via.placeholder.com/100?text=Hero" alt="hero preview thumbnail" />
            </div>
            <div className="bg-gray-300">
            <table className="text-center mx-auto w-full border border-red-900 border-separate">
                <caption className="text-lg my-2">{props.name}</caption>
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
                        <td className="table-cell">{props.strength}</td>
                        <td className="table-cell">{props.dexterity}</td>
                        <td className="table-cell">{props.magic}</td>
                        <td className="table-cell">{props.constitution}</td>
                        <td className="table-cell">{props.defense}</td>
                        <td className="table-cell">{props.resistance}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </Link>
    )
}

export default HeroPreview;