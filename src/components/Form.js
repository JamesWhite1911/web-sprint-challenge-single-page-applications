//imports
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

//required
//name text input field
//validation for name: must be at least 2 characters
//dropdown for pizza size
//checklist for toppings - at least 4
//text input for special instructions
//order button that submits and returns a database record
//: of name, size, toppings, and special instructions

//so we need: name, size, toppings, instructions

// formSchema
const formSchema = yup.object().shape({
    name: yup.string().min(2).required("Name is required"),
    size: yup.string().required("Size is required"),
    toppings: yup.string().required("Toppings are required"),
    instructions: yup.string().required("")
})

//component
export default function Form() {

    const initialData = {
        name: "",
        size: "",
        toppings: "",
        instructions: ""
    }

    const [order, setOrder] = useState([initialData]);
    const [formState, setFormState] = useState(initialData);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    //disable submit unless proper fields are filled
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    //errorState
    const [errorState, setErrorState] = useState({
        name: "",
        size: "",
        toppings: ""
    });

    //formSubmit
    const formSubmit = (e) => {
        e.preventDefault(); //don't reload when we submit
        console.log("Form submitted!");
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(res => {
                console.log(res.data);
                setOrder(res.data);
            })
            .catch(err => console.log(err))
    }

    //validation
    const validate = e => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value; //checkbox validation
        yup
            .reach(formSchema, e.target.name)
            .validate(value)
            .then(valid => {
                setErrorState({ ...errorState, [e.target.name]: "" })
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                })
            })
    }

    //inputChange
    const inputChange = (e) => {
        e.persist(); //don't reload when input is changed
        validate(e);

        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value; //checkbox input
        setFormState({ ...formState, [e.target.name]: value });
    }

    return (
        <div className="form-container">
            <form onSubmit={formSubmit}>

                {/*name, size, toppings, instructions*/}
                <label htmlFor="name">
                    Name:
                <input type="text" name="name" id="name" value={formState.name} onChange={inputChange} />
                </label>
                <label htmlFor="size">
                    Size:
                <input type="text" name="size" id="size" value={formState.size} onChange={inputChange} />
                </label>
                <label htmlFor="toppings">
                    Toppings:
                <input type="text" name="toppings" id="toppings" value={formState.toppings} onChange={inputChange} />
                </label>
                <label htmlFor="instructions">
                    Instructions:
                <input type="text" name="instructions" id="instructions" value={formState.instructions} onChange={inputChange} />
                </label>
                <button disabled={buttonDisabled}>Submit</button>
            </form>
        </div>
    )
}