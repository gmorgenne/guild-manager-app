import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import StaffPreview from "../../../components/Staff/StaffPreview";
import { trpc } from "../../../utils/trpc";

const FacilitiesPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const guild = trpc.guild.getGuildById.useQuery({ id: id })?.data;
        const staff = trpc.staff.getStaffByGuild.useQuery({ id: id })?.data;

    return (
        <div>
            {guild && (
                <section className="flex flex-col md:flex-row gap-8 md:items-start justify-between">
                            <div className="text-center rounded-3xl border-2 border-gray-500 bg-gray-300 p-4 min-w-[50%]">
                                <div className="flex gap-4 my-4">
                                    <Link href={`/guild/facilities/guild-hall/${id}`} className="btn--full">Guild Hall</Link>
                                    <Link href={`/guild/facilities/training-grounds/${id}`} className="btn--full">Training Grounds</Link>
                                </div>
                                <div className="flex gap-4 mb-4">
                                <Link href={`/guild/facilities/infirmary/${id}`} className="btn--full">Infirmary</Link>
                                <Link href={`/guild/facilities/guild-arena/${id}`} className="btn--full">Guild Arena</Link>
                                </div>
                                <div className="flex gap-4 mb-4">
                                    <Link href={`/staff/available`} className="btn--full">Hire Staff</Link>
                                </div>
                            </div>
                            <div className="rounded-3xl border-2 border-gray-500 bg-gray-300 p-4">
                            <h4 className="text-lg font-bold my-2 md:mt-0">Guild Facilities Levels</h4>
                            <div className="flex justify-between">
                                <span>Guild Hall:</span>
                                <span>{guild.guildHallLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Training Grounds:</span>
                                <span>{guild.trainingGroundLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Infirmary:</span>
                                <span>{guild.infirmaryLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Guild Arena:</span>
                                <span>{guild.guildArenaLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Workshop:</span>
                                <span>{guild.workshopLevel}</span>
                            </div>
                        </div>
                </section>
             )}
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

                    <section>
                        {`/guild/${id}` && (
                        <div className="mt-8">
                            <Link href={`/guild/${id}`} className="btn">Back to guild</Link>
                        </div>
                        )}
                    </section>
        </div>
    )
}
export default FacilitiesPage;