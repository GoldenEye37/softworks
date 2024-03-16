import React, { useState, useEffect, useRef } from 'react';
import { signup } from '../../services/authService';
import {set} from "lodash";

// font awesome icons
import {faCheck, faInfo, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

// regex for validating our data
const FIRSTNAME_REGEX = /^[A-Za-z]{4,20}$/;
const LASTNAME_REGEX = /^[A-Za-z]{4,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const COUNTRY_ID_REGEX =  /^\d+$/;
const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REGISTER_URL = ''
const SignupForm = () => {


    /*

    *************** data ***************
        {
            fname
            lname
            country_id
            phone
            email
            password
        }
    * */

    const nameRef = useRef();
    const lastNameRef = useRef();
    const countryIdRef  = useRef();
    const phoneRef  = useRef();
    const emailRef  = useRef();
    const errRef = useRef();

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

    // todo
    // set focus when component loads using userRef
    useEffect(() => {
        nameRef.current.focus()
    }, []);

    // useEffect to validate fields

    // validate firstName
    useEffect(() => {
        setValidFirstName(FIRSTNAME_REGEX.test(firstName));
    }, [firstName]);

    // validate lastName
    useEffect(() => {
        setValidLastName(LASTNAME_REGEX.test(lastName));
    }, [lastName]);

    // Country ID
    useEffect(() => {
        setValidCountryId( COUNTRY_ID_REGEX.test(countryId));
    }, [countryId]);

    // Phone Number
    useEffect(() => {
        setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
    }, [phoneNumber]);

    // Email Address
    useEffect(() => {
        setValidEmailAddress(EMAIL_REGEX.test(emailAddress));
    }, [emailAddress]);

    // validate Password and check for match
    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidPasswordMatch(password === matchPassword);
    }, [password, matchPassword]);

    // handle error
    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, countryId, emailAddress, phoneNumber, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = FIRSTNAME_REGEX.test(firstName);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // turn to postman variable
            const fname = firstName;
            const lname = lastName;
            const country_id = countryId;
            const phone = phoneNumber;
            const email = emailAddress;
            const password = password;


            const response = await axios.post(REGISTER_URL,
                JSON.stringify({fname,lname,country_id,phone,email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            // todo
            setFirstName('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
            <section onSubmit={handleSubmit}>
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <form>
                    <label
                        htmlFor="firstName"
                    >
                        First Name():
                        <span
                            className={validFirstName ? "valid" : "hide"}
                        >
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                        <span
                            className={validFirstName || !firstName ? "hide" : "valid"}
                        >
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={nameRef}
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required
                        aria-invalid={validFirstName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setFirstNameFocus(true)}
                        onBlur={() => setFirstNameFocus(false)}
                    />
                    <p id="uidnote"
                       className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 24 characters.<br/>
                        Must begin with a letter.<br/>
                        Letters, numbers, underscores, hyphens allowed.
                    </p>


                    {/**********************last Name*******************/}
                    <label
                        htmlFor="lastName"
                    >
                        Last Name:
                        <span
                            className={validLastName ? "valid" : "hide"}
                        >
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                        <span
                            className={validLastName || !lastName ? "hide" : "valid"}
                        >
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        ref={lastNameRef}
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        aria-invalid={validFirstName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setLastNameFocus(true)}
                        onBlur={() => setLastNameFocus(false)}
                        placeholder="example: John Smith"
                    />
                    <p
                        id="uidnote"
                        className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}
                    >
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        Last Name must have 4 to 24 characters.
                    </p>


                    {/**********************Country Id*******************/}
                    <label
                        htmlFor="country_id"
                    >
                        Country ID:
                        <span
                            className={validCountryId ? "valid" : "hide"}
                        >
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                        <span
                            className={validCountryId || !countryId ? "hide" : "valid"}
                        >
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    </label>
                    <input
                        type="text"
                        name="countryId"
                        // ref={lastNameRef}
                        onChange={(e) => setcountryId(e.target.value)}
                        required
                        aria-invalid={validCountryId ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setCountryIdFocus(true)}
                        onBlur={() => setCountryIdFocus(false)}
                    />


                    {/**********************Phone Number*******************/}
                    <label
                        htmlFor="country_id"
                    >
                        Phone Number:
                        <span
                            className={validPhoneNumber ? "valid" : "hide"}
                        >
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                        <span
                            className={validPhoneNumber || !phoneNumber ? "hide" : "valid"}
                        >
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        // ref={lastNameRef}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        aria-invalid={validPhoneNumber ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setPhoneNumberFocus(true)}
                        onBlur={() => setPhoneNumberFocus(false)}
                    />


                    {/**********************Email Address *******************/}
                    <label
                        htmlFor="emailAddress"
                    >
                        Email Address:
                        <span
                            className={validEmailAddress ? "valid" : "hide"}
                        >
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                        <span
                            className={validEmailAddress || !emailAddress ? "hide" : "valid"}
                        >
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    </label>
                    <input
                        type="text"
                        name="emailAddress"
                        // ref={lastNameRef}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                        aria-invalid={validEmailAddress ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailAddressFocus(true)}
                        onBlur={() => setEmailAddressFocus(false)}
                    />

                    {/**********************Password*******************/}
                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"}/>
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setpasswordFocus(true)}
                        onBlur={() => setpasswordFocus(false)}
                    />
                    <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 characters.<br/>
                        Must include uppercase and lowercase letters, a number and a special character.<br/>
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span
                        aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                        aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    {/**********************Confirm Password*******************/}

                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck}
                                         className={validPasswordMatch && matchPassword ? "valid" : "hide"}/>
                        <FontAwesomeIcon icon={faTimes}
                                         className={validPasswordMatch || !matchPassword ? "hide" : "invalid"}/>
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        value={matchPassword}
                        required
                        aria-invalid={validPasswordMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchPasswordFocus(true)}
                        onBlur={() => setMatchPasswordFocus(false)}
                    />
                    <p id="confirmnote"
                       className={matchPasswordFocus && !validPasswordMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        Must match the first password input field.
                    </p>

                    <button disabled={
                        !validFirstName ||
                        !validPassword ||
                        !validPasswordMatch
                    }>
                        Sign Up
                    </button>
                </form>

                <p>
                    Already registered?<br/>
                    <span className="line">
                   {/*put router link here*/}
                        <a href="#">Sign In</a>
                        </span>
                </p>
            </section>
            )}
        </>

    )

};

export default SignupForm;