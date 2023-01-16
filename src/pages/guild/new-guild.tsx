import type { NextPage } from "next";
import CreateGuildForm from "../../components/Guilds/CreateGuildForm"

const NewGuild: NextPage = () => {
    return (
        <section className="section">
            <h1>Create New Guild</h1>
            <CreateGuildForm />
        </section>
    )
}

export default NewGuild;