import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import StaffPreview from "../../components/Staff/StaffPreview";
import { trpc } from "../../utils/trpc";

const StaffPage: NextPage = () => {
    const staff = trpc.staff.getStaffByGuild.useQuery({ id: "0" })?.data;
    const [guildId, setGuildId] = useState("");

    useEffect(() => {
        if (typeof window === 'undefined') 
            return;
        const guild = sessionStorage.getItem("guild") ?? "";
        if (guild)
            setGuildId(guild);
    }, []);

    return (
        <div>
            <h1 className="text-2xl my-8">Available Staff</h1>
            <div className="tabs-container">
                <ul className="tabs">
                    <li className="tab"><Link href="/staff">All</Link></li>
                    <li className="tab active"><Link href="#">Available</Link></li>
                </ul>
            </div>
            {!staff && <p>Loading...</p>}
            <div className="cards">
                {staff && staff.map((staff, i) => {
                    return (
                        <div className="card" key={i}>
                            <StaffPreview staff={staff} link={true} />
                        </div>
                    )
                })}
            </div>
            {guildId && (
                <div className="mt-8">
                    <Link href={`/guild/${guildId}`} className="btn">Back to guild</Link>
                </div>
            )}
        </div>
    )
}

export default StaffPage;