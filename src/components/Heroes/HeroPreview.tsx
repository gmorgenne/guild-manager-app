import type { Hero } from "@prisma/client";
import Link from "next/link";

const HeroPreview = (props: Hero): JSX.Element => {
    return (
        <div className="hero-preview">
            <h2>Name: {props.name}</h2>
            <div>Race: {props.race}</div>
            <div>Class: {props.class}</div>
            <table>
                <thead>
                    <th>Str</th>
                    <th>Dex</th>
                    <th>Mag</th>
                    <th>Con</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.strength}</td>
                        <td>{props.dexterity}</td>
                        <td>{props.magic}</td>
                        <td>{props.constitution}</td>
                    </tr>
                </tbody>
            </table>
            <Link href={`/heroes/${props.id}`}>Details</Link>
        </div>
    )
}

export default HeroPreview;