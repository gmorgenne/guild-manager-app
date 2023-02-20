import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const HeroesPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";

    return (
        <div>
            <h1 className="text-2xl my-8">Guild Facilities</h1>
            <div className="mt-8">
                <Link href={`/guild/${id}`} className="btn">Back to guild</Link>
            </div>
        </div>
    )
}

export default HeroesPage;