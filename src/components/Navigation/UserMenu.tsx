import { useSession } from "next-auth/react";
import Image from "next/image";

const UserMenu = (): JSX.Element => {
    const { data: sessionData } = useSession();
    return (
        <div className="text-right flex">
            {sessionData?.user?.image && <Image src={sessionData?.user?.image} alt={sessionData?.user?.name ?? ""} width={30} height={30} className="mr-4" />}
            {sessionData?.user?.name && <div>{sessionData?.user?.name}</div>}
        </div>
    )
}

export default UserMenu;