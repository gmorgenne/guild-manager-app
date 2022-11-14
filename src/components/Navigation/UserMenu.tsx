import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const UserMenu = (): JSX.Element => {
    const { data: sessionData } = useSession();
    return (
        <div className="text-right flex items-center">
            {sessionData?.user?.image && <Image src={sessionData?.user?.image} alt={sessionData?.user?.name ?? ""} width={40} height={40} className="mr-4" />}
            {sessionData?.user?.name && <div>{sessionData?.user?.name}</div>}
            <button
                className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100 ml-4"
                onClick={sessionData ? () => signOut() : () => signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    )
}

export default UserMenu;