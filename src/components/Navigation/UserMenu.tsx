import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const UserMenu = (): JSX.Element => {
    const { data: sessionData } = useSession();
    return (
        <div className="flex items-center justify-between gap-4">
            {sessionData?.user?.image && <Image src={sessionData?.user?.image} alt={sessionData?.user?.name ?? ""} width={40} height={40} className="hidden sm:block" />}
            {sessionData?.user?.name && <div className="hidden sm:block">{sessionData?.user?.name}</div>}
            <button
                className="btn"
                onClick={sessionData ? () => signOut() : () => signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    )
}

export default UserMenu;