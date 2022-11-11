import Link from "next/link"
import Menu from "../components/Navigation/Menu";
import UserMenu from "../components/Navigation/UserMenu";

const DefaultLayout = ({ children }: any) => {

    return (
        <main>
            <header>
                <div className="flex justify-between items-center">
                    <Menu />
                    <Link href="/guild"><h1 className="text-5xl text-center">Guild Manager</h1></Link>
                    <UserMenu />
                </div>
            </header>
            <main>
                {children}
            </main>
        </main>
    )
}

export default DefaultLayout;