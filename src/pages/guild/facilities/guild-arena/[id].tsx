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
                      <caption className="text-lg flex">Guild Arena is unlocked at the Region League level. This is allows for Guilds to make money off of Home League matches. The higher the arena level, the higher the ticket prices and the more employees that can be hired. A player can hire an Arena Manager, a Grounds Keeper, and Vendors with this facility. The Arena Manager is a required staff member. The better the staff manager, the more fans are happy, which increases ticket sales. Grounds Keepers increases hero happiness and reduces injury rating during home matches. Vendors sell food and beverages to make more money.</caption>
                       <table className="text-center block md:table mt-8 md:mt-0">
                            <thead className="block md:table-header-group">
                                <tr className="block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                                    <th className="tbl-cell">Guild Arena Level</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group">
                                <tr className="block md:table-row">
                                    <td className="flex justify-between md:table-cell tbl-cell"><span className="md:hidden">Guild Arena</span>{guild.guildArenaLevel}</td>
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