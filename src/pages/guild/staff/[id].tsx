import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import StaffPreview from "../../../components/Staff/StaffPreview";
import { trpc } from "../../../utils/trpc";

const StaffPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const staff = trpc.staff.getStaffByGuild.useQuery({ id: id })?.data;

    return (
        <div>
            <h1 className="text-2xl my-8">Guild Staff</h1>
            <div className="cards">
                {staff && staff.map((staff, i) => {
                    return (
                        <div className="card" key={i}>
                            <StaffPreview staff={staff} link={true} />
                        </div>
                    )
                })}
            </div>
            <div className="mt-8">
                <Link href={`/guild/${id}`} className="btn">Back to guild</Link>
            </div>
        </div>
    )
}

export default StaffPage;