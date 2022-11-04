import type { NextPage } from "next";
import { useRouter } from "next/router";
import HeroDetail from "../../components/Heroes/HeroDetail";
import { trpc } from "../../utils/trpc";

const HeroPage: NextPage = () => {
    const { asPath } = useRouter();
    const id = asPath.split('/').pop() ?? "";
    const hero = trpc.hero.getHero.useQuery({ id: id })?.data;
    return (
        <div>
            {hero && (
                <HeroDetail {...hero} />
            )}
        </div>
    )
}

export default HeroPage;