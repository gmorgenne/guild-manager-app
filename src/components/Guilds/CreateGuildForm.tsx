import { useSession } from "next-auth/react";
import type { Color } from "react-input-color";
import InputColor from "react-input-color";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import type { SubmitHandler} from "react-hook-form";
import { useForm } from "react-hook-form";

interface IFormValues {
    name: string;
    badge: string;
}

const CreateGuildForm = (): JSX.Element => {
    const { data: sessionData } = useSession();
    const [primaryColor, setPrimaryColor] = useState<Color>();
    const [secondaryColor, setSecondaryColor] = useState<Color>();
    const { handleSubmit, register } = useForm<IFormValues>();
    const mutation = trpc.guild.createGuild.useMutation();

    const createGuild: SubmitHandler<IFormValues> = data => {
        const user = sessionData?.user;
        console.log('submited data: ', data)
        console.log('user: ', user);

        mutation.mutate({
            name: data.name,
            badge: parseInt(data.badge),
            primaryColor: primaryColor?.hex ?? "",
            secondaryColor: secondaryColor?.hex ?? ""
        })
    }

    return (
        <form className="create-guild-form form" onSubmit={handleSubmit(createGuild)}>
            <fieldset>
                <label>
                    Name:
                    <input type="text" {...register("name", { required: true })} />
                </label>
            </fieldset>
            <fieldset>
                <label>Primary Color:</label>
                <div className="w-10 h-10 mb-5" style={{ backgroundColor: primaryColor?.rgba }}>
                </div>
                {primaryColor?.rgba}
                <InputColor initialValue="#db011c" onChange={setPrimaryColor} />
            </fieldset>
            <fieldset>
                <label>Secondary Color:</label>
                <div className="w-10 h-10 mb-5" style={{ backgroundColor: secondaryColor?.rgba }}>
                </div>
                {secondaryColor?.rgba}
                <InputColor initialValue="#db011c" onChange={setSecondaryColor} />
            </fieldset>
            <fieldset>
                <label>
                    Badge:
                    <input type="tel" {...register("badge", { required: true, pattern:{ value: /^[0-9*]/i, message: "" } })} />
                </label>
            </fieldset>
            <fieldset>
                <input type="submit" value="Submit" />
            </fieldset>
        </form>
    )
}

export default CreateGuildForm;