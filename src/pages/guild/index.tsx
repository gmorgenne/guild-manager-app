import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import UserGuildList from "../../components/Guilds/UserGuildList";

const Guild: NextPage = () => {

    return (
        <>
            <Head>
                <title>Guild Manager</title>
                <meta name="description" content="Guild Manager - Create a guild, manage it into the ground!" />
            </Head>

            <div className="my-8">
                <Link href="/guild/new-guild" className="btn">
                    Create New Guild
                </Link>
                <Link href="/guild/guilds" className="btn">
                    All Guilds
                </Link>

                <UserGuildList />
            </div>

        </>
    )
}

export default Guild;