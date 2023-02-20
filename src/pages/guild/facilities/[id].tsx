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
            <section>
            <h1 className="text-2xl my-8">Guild Facilities</h1>
            </section>
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