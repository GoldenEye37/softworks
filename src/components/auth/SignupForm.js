import React, { useState } from 'react';
import { signup } from '../../services/authService';
import {set} from "lodash";

const SignupForm = () => {

    // use useEffect to control form data changes
    const [formData, setFormData] = useState(
        {
            "fname": "",
            "lname":"",
            "country_id":"",
            "phone":"",
            "email":"",
            "password":""
        }
    );

    // handle change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // call authService singup and pass data
        signup(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="First Name"
            />
            <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Last Name"
            />
            <input
                type="number"
                name="country_id"
                value={formData.country_id}
                onChange={handleChange}
                placeholder="Country ID"
            />
            <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button type="submit">Signup</button>
        </form>
    )

}