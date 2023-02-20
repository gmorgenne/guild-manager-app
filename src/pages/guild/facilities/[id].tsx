import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

const FacilitiesPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const guild = trpc.guild.getGuildById.useQuery({ id: id })?.data;

    return (
        <div>
            {guild && (
                <section>
                   <h1 className="text-2xl my-8">Guild Facilities</h1>
                       <table className="text-center block md:table mt-8 md:mt-0">
                            <caption className="text-lg block md:table-caption">Guild Facilities Levels</caption>
                            <thead className="block md:table-header-group">
                                <tr className="block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                    <th className="tbl-cell">Mess Hall</th>
                                    <th className="tbl-cell">Workshop</th>
                                    <th className="tbl-cell">Training Ground</th>
                                    <th className="tbl-cell">Barracks</th>
                                    <th className="tbl-cell">Infirmary</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group">
                                <tr className="block md:table-row">
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Mess Hall</span>{guild.messHallLevel}</td>
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Workshop</span>{guild.workshopLevel}</td>
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Training Ground</span>{guild.trainingGroundLevel}</td>
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Barracks</span>{guild.barracksLevel}</td>
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Infirmary</span>{guild.infirmaryLevel}</td>
                                </tr>
                            </tbody>
                        </table>
                </section>
             )}
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