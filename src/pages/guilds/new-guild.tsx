import type { NextPage } from "next";
import { CreateGuildForm } from "../../components/Guilds"

const NewGuild: NextPage = () => {
    return (
        <div>
            <h1>Create New Guild</h1>
            <CreateGuildForm />
        </div>
    )
}

export default NewGuild;