import Link from "next/link"
import Menu from "../components/Navigation/Menu";
import UserMenu from "../components/Navigation/UserMenu";

const DefaultLayout = ({ children }: any) => {

    return (
        <>
            <header>
                <div className="flex justify-between items-center px-4 bg-gray-400">
                    <Link href="/">
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-700 bg-gray-400">
                            Guild <span className="text-indigo-500 bg-gray-400">Manager</span>
                        </h2>
                    </Link>
                    <UserMenu />
                </div>
                <Menu />
            </header>
            <main className="mx-4 mb-8">
                {children}
            </main>
        </>
    )
}

export default DefaultLayout;