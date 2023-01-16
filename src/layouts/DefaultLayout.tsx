import Link from "next/link"
import Menu from "../components/Navigation/Menu";
import UserMenu from "../components/Navigation/UserMenu";

const DefaultLayout = ({ children }: any) => {

    return (
        <>
            <header>
                <div className="flex justify-between items-center">
                    <Menu />
                    <Link href="/">
                        <h2 className="text-5xl font-extrabold text-center text-gray-700">
                            Guild <span className="text-green-400">Manager</span>
                        </h2>
                    </Link>
                    <UserMenu />
                </div>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}

export default DefaultLayout;