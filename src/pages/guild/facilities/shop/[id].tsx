import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const ShopPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";

    return (
        <div>
            {`/guild/${id}` && (
                    <div className="mt-8">
                        <Link href={`/guild/facilities/${id}`} className="btn">Back to guild facilities</Link>
                        <Link href={`/guild/${id}`} className="btn">Back to guild</Link>
                    </div>
                    )}
        </div>
    )
}

export default ShopPage;