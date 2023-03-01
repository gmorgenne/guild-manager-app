import type { Staff } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

const StaffDetail = (props: Staff): JSX.Element => {
    const { data: sessionData } = useSession();
    const isAuthenticated = sessionData?.user != undefined;
    const mutation = trpc.staff.addStaff.useMutation();
    const guildId = sessionStorage.getItem("guild") ?? "0";
    const isAvailable = isAuthenticated && props.guildId === "0" && guildId != "0";
    
    const addStaffToGuild = () => {
        mutation.mutate({ guildId: guildId, staffId: props.id });
    }

    return (
        <div className="staff-detail">
            <h1 className="text-2xl font-bold flex underline">Staff Info</h1>
            <div>Name: {props.name}</div>
            <div>Sex: {props.sex ? "Male" : "Female"}</div>
            <div>Race: {props.race}</div>
            <div>Job Class: {props.jobClass}</div>
            <div>Job Speciality: {props.jobSpec}</div>
            <div>Happiness: {props.happiness}</div>

            {(guildId === props.guildId || isAvailable) && (
                <div>
                    <div>Contract Cost: {props.contractCost}</div>
                    <div>Contract Demands: {props.contractDemand} days</div>
                    <div>Contract Expirations: {props.contractExpiration.toLocaleDateString("en-us")}</div>
                </div>
            )}

            <div className="flex">
                {isAvailable && !mutation.isSuccess && (
                    <button className="btn" onClick={addStaffToGuild}>Add Staff to your Guild!</button>
                )}
                {mutation.isSuccess && <button disabled={true} className="btn success">Added Successfully!</button>}
                {guildId !== "0" && (
                    <Link href={`/guild/${guildId}`} className="btn">Back to Guild</Link>
                )}
            </div>
        </div>
    )
}

export default StaffDetail;