import type { Color } from "react-input-color";
import InputColor from "react-input-color";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

interface IFormValues {
    name: string;
    badge: string;
}

const CreateGuildForm = (): JSX.Element => {
    const [primaryColor, setPrimaryColor] = useState<Color>();
    const [secondaryColor, setSecondaryColor] = useState<Color>();
    const { handleSubmit, register } = useForm<IFormValues>();
    const mutation = trpc.guild.createGuild.useMutation({
        onSuccess: (data) => {
            const id = data.data.guild?.id;
            window.location.assign(`/guild/${id}`);
        }
    });

    const createGuild: SubmitHandler<IFormValues> = data => {
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
                <InputColor initialValue="#ffffff" onChange={setSecondaryColor} />
            </fieldset>
            <fieldset>
                <label>
                    Badge:
                    <input type="number" {...register("badge", { required: true, pattern: { value: /^[0-9*]/i, message: "" } })} />
                </label>
            </fieldset>
            <fieldset>
                <input type="submit" disabled={mutation.isLoading} value="Submit" />
                {mutation.error && <p>Something went wrong creating guild! {mutation.error.message}</p>}
            </fieldset>
            <div className={mutation.isSuccess ? "visible" : "invisible"}>
                <p>Guild created successfully!</p>
                <p>Redirecting you there shortly...</p>
            </div>
        </form>
    )
}

export default CreateGuildForm;