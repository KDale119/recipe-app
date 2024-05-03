import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import React from "react";
import {useForm} from "react-hook-form";

export default function RecipeForm() {
    const schema = yup.object().shape({
        title: yup.string().min(4).max(20).required("Title is required"),
        ingredients: yup.string().min(15).required("Ingredients are required"),
        instructions: yup.string().min(20).max(100).required("Instructions are required")
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            ingredients: "",
            instructions: ""
        }
    })
    const onSubmit = (formData: { title: string, ingredients: string, instructions: string }) => {
        alert("Form submitted")
        console.log(formData)
    }
    const formKeys: { id: string, name: "title" | "instructions" | "ingredients" }[] = [{
        id: "a",
        name: "title"
    }, {id: "b", name: "ingredients"}, {id: "c", name: "instructions"}]

    return (
        <div className="App">
            <header className="App-header"></header>
            <h2 className="header">Recipe Form</h2>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                {formKeys.map(item => (
                    <>
                        <input placeholder={item.name} id={item.id} key={item.id} {...register(item.name)}/>
                        {errors[item.name] && <p style={{color: "red"}}>{(errors[item.name]?.message)}</p>}
                    </>
                ))}
                <button className="button">Submit</button>
            </form>
        </div>
    )
}