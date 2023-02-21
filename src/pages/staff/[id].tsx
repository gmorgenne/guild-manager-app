import type { NextPage } from "next";
import { useRouter } from "next/router";
import StaffDetail from "../../components/Staff/StaffDetail";
import { trpc } from "../../utils/trpc";

const StaffPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const staff = trpc.staff.getHero.useQuery({ id: id })?.data;
    return (
        <div>
            {staff && (
                <StaffDetail {...staff} />
            )}
        </div>
    )
}

export default StaffPage;