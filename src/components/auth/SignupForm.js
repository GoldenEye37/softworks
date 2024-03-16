import React, { useState, useEffect, useRef } from 'react';
import { signup } from '../../services/authService';
import {set} from "lodash";

// font awesome icons
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// regex for validating our data
const FIRSTNAME_REGEX = /^[A-Za-z]{1,20}$/;
const LASTNAME_REGEX = /^[A-Za-z]{1,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$/;
const COUNTRY_ID_REGEX =  /^\d+$/;
const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupForm = () => {
    const userRef = useRef();
    const errRef = useRef();

    // use useState to store data
    const [formData, setFormData] = useState(
        {
            "fname": "",
            "lname":"",
            "country_id":1,
            "phone":"",
            "email":"",
            "password":""
        }
    );

    // firstName
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    // lastName
    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    // Country Id
    const [countryId, setcountryId] = useState('');
    const [validCountryId, setValidCountryId] = useState(false);
    const [countryIdFocus, setCountryIdFocus] = useState(false);

    // Email Address
    const [emailAddress, setEmailAddress] = useState('');
    const [validEmailAddress, setValidEmailAddress] = useState(false);
    const [emailAddressFocus, setEmailAddressFocus] = useState(false);

    // Phone Number
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    // Password
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);

    // Confirm Password
    const [matchPassword, setMatchPassword] = useState('');
    const [validPasswordMatch, setValidPasswordMatch] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    // error message
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // set focus when component loads using userRef
    useEffect(() => {
        useRef.current.focus()
    }, []);

    // useEffect to validate fields

    // validate firstName
    useEffect(() => {
        const result = FIRSTNAME_REGEX.test(firstName);
        console.log(result);
        console.log(firstName);
        setValidFirstName(result);
    }, [firstName]);

    // validate lastName
    useEffect(() => {
        const result = LASTNAME_REGEX.test(lastName);
        console.log(result);
        console.log(lastName);
        setValidLastName(result);
    }, [lastName]);

    // validate Password and check for match
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidPasswordMatch(match)
    }, [password, matchPassword]);

    // handle error
    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, matchPassword]);

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

};

export default SignupForm;