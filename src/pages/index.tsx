import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import UserGuildList from "../components/Guilds/UserGuildList";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Guild Manager</title>
        <meta name="description" content="Guild Manager Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="section center">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Guild <span className="text-green-400">Manager</span>
        </h1>
        <p>
          Become the manager of a guild. Hire heroes, train them, create parties and send them on quests.
          Collect gold. Upgrade guild. You know... stuff.
        </p>
        <div className="my-8 center">
          <Link href="/guild/new-guild" className="btn">
            Create New Guild
          </Link>
          <UserGuildList />
        </div>
      </section>
      <section className="section">
        <h2>Key Features</h2>
        <p>Here is a list of things you can do:</p>
        <ul>
          <li>Create Guild</li>
          <li>Hire Heroes</li>
          <li>Train Heroes</li>
          <li>More to come...</li>
        </ul>
      </section>
    </>
  );
};

export default Home;