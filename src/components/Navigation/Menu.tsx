import Link from "next/link";

const Menu = (): JSX.Element => {
    return (
        <div className="flex justify-around">
            <Link href="/guild" className="pr-4">Guild</Link>
            <Link href="/heroes" className="px-4">Heroes</Link>
        </div>
    )
}

export default Menu;