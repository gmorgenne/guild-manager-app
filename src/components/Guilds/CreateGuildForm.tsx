import type { Color } from "react-input-color";
import InputColor from "react-input-color";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import BadgeSelector from "../Badges/BadgeSelector";

interface IFormValues {
    name: string;
    badge: string;
}

const CreateGuildForm = (): JSX.Element => {
    const [primaryColor, setPrimaryColor] = useState<Color>();
    const [secondaryColor, setSecondaryColor] = useState<Color>();
    const [selectedBadge, setSelectedBadge] = useState<number>(0);
    const { handleSubmit, register } = useForm<IFormValues>();
    const mutation = trpc.guild.createGuild.useMutation({
        onSuccess: (data) => {
            const id = data.data.guild?.id;
            sessionStorage.setItem("guild", id);
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

    const selectBadge = (index: number) => {
        setSelectedBadge(index);
    };

    return (
        <form className="create-guild-form flex flex-wrap flex-col form gap-4" onSubmit={handleSubmit(createGuild)}>
            <fieldset>
                <label>
                    <div className="font-bold">Name:</div>
                    <input className="bg-slate-200 hover:bg-slate-300" type="text" {...register("name", { required: true })} />
                </label>
            </fieldset>
            <fieldset>
                <label className="font-bold">Primary Color:</label>
                <div>
                    <InputColor initialValue="#63de7c" onChange={setPrimaryColor} />
                </div>
            </fieldset>
            <fieldset>
                <label className="font-bold">Secondary Color:</label>
                <div>
                    <InputColor initialValue="#ffffff" onChange={setSecondaryColor} />
                </div>
            </fieldset>
            <fieldset>
                <label>
                    <div className="font-bold">Guild Emblem:</div>
                    <BadgeSelector SelectedIndex={selectedBadge} PrimaryColor={primaryColor?.hex || "#fff"} SecondaryColor={secondaryColor?.hex || "#000"} selectBadge={selectBadge} />
                    <input type="number" {...register("badge", { required: true, pattern: { value: /^[0-9*]/i, message: "" } })} value={selectedBadge} />
                </label>
            </fieldset>
            <fieldset>
                <input type="submit" disabled={mutation.isLoading} value="Submit" className="btn" />
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