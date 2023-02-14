import Link from "next/link";

const Menu = (): JSX.Element => {
    return (
        <div className="bg-gray-300 px-4 py-2 flex gap-8">
            <Link href="/guild">Guild</Link>
            <Link href="/heroes">Heroes</Link>
            <Link href="/quests">Quests</Link>
        </div>
    )
}

export default Menu;