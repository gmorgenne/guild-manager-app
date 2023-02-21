import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import StaffPreview from "../../components/Staff/StaffPreview";
import { trpc } from "../../utils/trpc";

const StaffPage: NextPage = () => {
    const { data, error, isError, isLoading } = trpc.staff.getAll.useQuery();
    const [guildId, setGuildId] = useState("");

    useEffect(() => {
        if (typeof window === 'undefined') 
            return;
        const guild = sessionStorage.getItem("guild") ?? "";
        if (guild)
            setGuildId(guild);
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        console.log('error: ', error);
        return <div>Error</div>
    }

    return (
        <div>
            <h1 className="text-2xl my-8">All Staff</h1>
            <div className="tabs-container">
                <ul className="tabs">
                    <li className="tab active"><Link href="#">All</Link></li>
                    <li className="tab"><Link href="/staff/available">Available</Link></li>
                </ul>
            </div>
            <div className="cards">
                {data && data.map((staff, i) => {
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