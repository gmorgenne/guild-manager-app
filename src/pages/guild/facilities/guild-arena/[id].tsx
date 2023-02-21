import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";

const FacilitiesPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const guild = trpc.guild.getGuildById.useQuery({ id: id })?.data;

    return (
        <div>
            {guild && (
                <section>
                   <h1 className="text-2xl my-8">Guild Arena</h1>
                       <table className="text-center block md:table mt-8 md:mt-0">
                            <caption className="text-lg block md:table-caption">Guild Arena Level</caption>
                            <thead className="block md:table-header-group">
                                <tr className="block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                    <th className="tbl-cell">Guild Arena</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group">
                                <tr className="block md:table-row">
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Guild Arena</span>{guild.barracksLevel}</td>

                                </tr>
                            </tbody>
                        </table>
                </section>
             )}
                <section>
                    {`/guild/${id}` && (
                    <div className="mt-8">
                        <Link href={`/guild/facilities/${id}`} className="btn">Back to guild facilities</Link>
                        <Link href={`/guild/${id}`} className="btn">Back to guild</Link>
                    </div>
                    )}
                </section>
        </div>
    )
}

export default FacilitiesPage;