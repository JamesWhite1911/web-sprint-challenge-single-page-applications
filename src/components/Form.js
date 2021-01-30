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
    cheese: yup.string().notRequired(),
    pepperoni: yup.string().notRequired(),
    sausage: yup.string().notRequired(),
    anchovies: yup.string().notRequired(),
    instructions: yup.string().notRequired()
})

//component
export default function Form() {

    const initialData = {
        name: "",
        size: "",
        cheese: "",
        pepperoni: "",
        sausage: "",
        anchovies: "",
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
        size: ""
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
            .validate(e.target.value)
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
                <label htmlFor="name">
                    Name:
                <input type="text" name="name" id="name" value={formState.name} onChange={inputChange} />
                </label>
                {/* dropdown (we will need a praceholder) */}
                <label htmlFor="size">
                    Size:
                <select name="size" id="size" value={formState.size} onChange={inputChange}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                </label>
                {/* check boxes */}
                <p>Toppings: </p>
                <label htmlFor="cheese">
                    Cheese:
                <input type="checkbox" name="cheese" id="cheese" checked={formState.cheese} onChange={inputChange} />
                </label>
                <label htmlFor="pepperoni">
                    Pepperoni:
                <input type="checkbox" name="pepperoni" id="pepperoni" checked={formState.pepperoni} onChange={inputChange} />
                </label>
                <label htmlFor="sausage">
                    Sausage:
                <input type="checkbox" name="sausage" id="sausage" checked={formState.sausage} onChange={inputChange} />
                </label>
                <label htmlFor="anchovies">
                    Anchovies:
                <input type="checkbox" name="anchovies" id="anchovies" checked={formState.anchovies} onChange={inputChange} />
                </label>
                <label htmlFor="instructions">
                    Instructions:
                <input type="text" name="instructions" id="instructions" value={formState.instructions} onChange={inputChange} />
                </label>
                <button disabled={buttonDisabled}>Add to order</button>
            </form>
        </div>
    )
}