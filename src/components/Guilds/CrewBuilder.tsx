import type { Staff } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent, MouseEventHandler } from "react";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import StaffPreview from "../../components/Staff/StaffPreview";
import { trpc } from "../../utils/trpc";

const CrewBuilder = (): JSX.Element => {
    const router = useRouter();
    const id = router.asPath.split('/').pop() || "";
    const staffs = trpc.staff.getStaffByGuild.useQuery({ id: id })?.data;
    const [availableStaff, setAvailableStaff] = useState<Staff[]>(staffs ?? []);
    const [crewStaff, setCrewStaff] = useState<Staff[]>();
    const [crewName, setCrewName] = useState("Crew 1");
    const crew = useMemo(() => {

        return {
            staff: crewStaff,
            name: crewName
        }
    }, [crewStaff, crewName]);
    
    useEffect(() => {
        if (staffs) {
            setAvailableStaff(staffs.filter((staff) => { return staff.crewId == null }));
        }
    }, [staffs]);

    const addStaffToCrew = (e: MouseEventHandler<HTMLButtonElement>, staff: Staff) => {
        setCrewStaff(crewStaff?.concat({ ...staff }) ?? [staff]);
        const newStaff = availableStaff?.filter((h) => { return staff != h });
        setAvailableStaff(newStaff ?? []);
    }

    const removeStaffFromCrew = (e: MouseEventHandler<HTMLButtonElement>, staff: Staff) => {
        setAvailableStaff(availableStaff?.concat({ ...staff }) ?? [staff]);
        const index = crewStaff?.indexOf(staff) ?? -1;
        if (index > -1) {
            const newStaff = crewStaff?.filter((h) => { return staff != h });
            setCrewStaff(newStaff);
        }
    };
    const renameCrew = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCrewName(value);
    };

    return (
        <section>
            {crew && (
                <div>
                    <h2 className="text-xl my-8">Crew Builder</h2>
                    <p>Assign staff to crews to work in your facilities! Staff provide unique bonuses to your guild based on their Job Specialties.</p>
                    {crewStaff && (
                        <div className="bg-gray-400 p-4 rounded-3xl">
                            <div className="lg:flex justify-between items-center">
                                <h2 className="text-xl my-2">
                                    <label>Name: </label>
                                    <input name="crewName" value={crewName} type="text" onChange={renameCrew} className="h-10 px-2" />
                                </h2>
                            </div>
                            <div className="cards">
                                {crewStaff.map((staff, i) => {
                                    return (
                                        <div className="card" key={i}>
                                            <StaffPreview staff={staff} link={false} />
                                            <button className="close" onClick={(e: any) => removeStaffFromCrew(e, staff)}>X</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {availableStaff && (
                <div>
                    <h2 className="text-xl my-8">Available Staff</h2>
                    <div className="cards">
                        {availableStaff.map((staff, i) => {
                            return (
                                <button className="card" key={i} onClick={(e: any) => addStaffToCrew(e, staff)}>
                                    <StaffPreview staff={staff} link={false} />
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
            {availableStaff?.length === 0 && <Link href="/staff/available" className="btn">Hire Staff</Link>}
        </section>
    )
}

export default CrewBuilder;