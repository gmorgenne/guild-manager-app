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
                   <h1 className="text-2xl my-8">Training Grounds</h1>
                      <caption className="text-lg flex">The Training Grounds are a place to send your heroes to train and gain experience. The higher the Training Grounds, the more heroes you can assign to training and the more experience they will gain. You are required to have a Guild Coach assigned to the Training Grounds to lead your team through their League Matches. Grounds Keepers increase hero happiness and reduce injury chances. A Guild Scout can help to discovery Free Agents stats and give better insights into heroes.</caption>
                       <table className="text-center block md:table mt-8 md:mt-0">
                            <thead className="block md:table-header-group">
                                <tr className="block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                    <th className="tbl-cell">Training Grounds Level</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group">
                                <tr className="block md:table-row">
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Training Grounds</span>{guild.trainingGroundLevel}</td>

                                </tr>
                            </tbody>
                        </table>
                </section>
             )}
                        {/* Add Button to upgade Facility for a cost (Lvl 2 = 1000 gold?, Lvl 3 = 5000 gold?) */}
                        <section className="flex">
                            <Link href={`/guild/staff/${id}`} className="btn">Guild Staff</Link>
                        </section>
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