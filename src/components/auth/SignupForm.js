import React, { useState, useEffect, useRef } from 'react';
import { signup } from '../../services/authService';
import {set} from "lodash";

// font awesome icons
import {faCheck, faInfo, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import {Link} from "react-router-dom";


// regex for validating our data
const FIRSTNAME_REGEX = /^[A-Za-z]{4,20}$/;
const LASTNAME_REGEX = /^[A-Za-z]{4,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const COUNTRY_ID_REGEX =  /^\d+$/;
const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SIGNUP_URL = 'https://app.signalgas.io/api/v1/customer/signup'
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
    // useEffect(() => {
    //     nameRef.current.focus()
    // }, []);

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
        try {
            console.log("url" + SIGNUP_URL)
            const response = await axios.post(SIGNUP_URL,
                {
                    fname:firstName,
                    lname:lastName,
                    country_id:countryId,
                    phone:phoneNumber,
                    email:emailAddress,
                    password:password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                     withCredentials: true
                }
            );
            console.log(JSON.stringify(response.data.message));
            setSuccess(true);
            setFirstName('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                console.log(err.response.data);
                setErrMsg('Username Taken');
            } else {
                console.log(err.response.status);
                setErrMsg('Registration Failed');
                console.log(err.response.data);

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
                <section onSubmit={handleSubmit}
                         className="flex m-6 p-12 min-w-fit flex-col max-w-md rounded-md sm:p-10 bg-gray-600 text-gray-100">
                    <div className=" my-0 mb-2 text-center">
                        <h1 className="my-3 text-2xl font-bold m-0 p-0">Sign Up </h1>
                        <p className="text-sm text-gray-400 m-0 p-0">to Get Started</p>
                    </div>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <form noValidate="" action="" className="space-y-12 min-w-full">
                        <div className="space-y-4 m-0 p-0 min-w-64">
                            <div className="flex flex-row ">
                                {/********************** first Name *******************/}
                                <div className="mx-4">
                                    <label htmlFor="firstName" className="block mb-2 text-sm">
                                        First Name:
                                        <span
                                            className={validFirstName ? "valid" : "hide"}
                                        >
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </span>
                                        <span
                                            className={validFirstName || !firstName ? "hide" : "invalid"}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </span>
                                    </label>
                                    <input type="text" name="firstName" id="firstName" placeholder="John"
                                           className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-gray-100"
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
                                </div>

                                {/********************** last Name *******************/}
                                <div className="mx-4">
                                    <label htmlFor="lastName" className="block mb-2 text-sm">
                                        Last Name:
                                        <span
                                            className={validLastName ? "valid" : "hide"}
                                        >
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </span>
                                        <span
                                            className={validLastName || !lastName ? "hide" : "invalid"}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </span>
                                    </label>
                                    <input type="text" name="lastName" id="lastName" placeholder="Smith"
                                           className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-gray-100"
                                           ref={lastNameRef}
                                           autoComplete="off"
                                           onChange={(e) => setLastName(e.target.value)}
                                           required
                                           aria-invalid={validFirstName ? "false" : "true"}
                                           aria-describedby="uidnote"
                                           onFocus={() => setLastNameFocus(true)}
                                           onBlur={() => setLastNameFocus(false)}
                                    />
                                    <p
                                        id="uidnote"
                                        className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        Last Name must have 4 to 24 characters.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row ">
                                {/********************** country Id *******************/}
                                <div className="mx-4">
                                    <label htmlFor="country_id" className="block mb-2 text-sm">
                                        Country ID:
                                        <span
                                            className={validCountryId ? "valid" : "hide"}
                                        >
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </span>
                                        <span
                                            className={validCountryId || !countryId ? "hide" : "invalid"}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </span>
                                    </label>
                                    <input type="text" name="countryId" id="countryId" placeholder="0"
                                           className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-gray-100"
                                           ref={countryIdRef}
                                           autoComplete="off"
                                           onChange={(e) => setcountryId(e.target.value)}
                                           required
                                           aria-invalid={validCountryId ? "false" : "true"}
                                           aria-describedby="uidnote"
                                           onFocus={() => setCountryIdFocus(true)}
                                           onBlur={() => setCountryIdFocus(false)}
                                    />
                                    <p
                                        id="uidnote"
                                        className={countryIdFocus && countryId && !validCountryId ? "instructions" : "offscreen"}
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        Country Id is supposed to be a positive number.
                                    </p>
                                </div>

                                {/********************** Phone Number *******************/}
                                <div className="mx-4">
                                    <label htmlFor="phoneNumber" className="block mb-2 text-sm">
                                        Phone Number:
                                        <span
                                            className={validPhoneNumber ? "valid" : "hide"}
                                        >
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </span>
                                        <span
                                            className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </span>
                                    </label>
                                    <input type="text" name="phoneNumber" id="phoneNumber" placeholder="0771234567"
                                           className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-gray-100"
                                           ref={phoneRef}
                                           autoComplete="off"
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                           required
                                           aria-invalid={validPhoneNumber ? "false" : "true"}
                                           aria-describedby="uidnote"
                                           onFocus={() => setPhoneNumberFocus(true)}
                                           onBlur={() => setPhoneNumberFocus(false)}
                                    />
                                    <p
                                        id="uidnote"
                                        className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        Your phone number is supposed to be a 10 digits.
                                        Please input numbers only.
                                    </p>
                                </div>
                            </div>

                            {/********************** Email Address *******************/}
                            <div className="mx-4">
                                <label htmlFor="emailAddress" className="block mb-2 text-sm">
                                    Email Address:
                                    <span
                                        className={validEmailAddress ? "valid" : "hide"}
                                    >
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span
                                        className={validEmailAddress || !emailAddress ? "hide" : "invalid"}
                                    >
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <input type="text" name="emailAddress" id="emailAddress" placeholder="jsmith@gmail.com"
                                       className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-gray-100"
                                       ref={emailRef}
                                       autoComplete="off"
                                       onChange={(e) => setEmailAddress(e.target.value)}
                                       required
                                       aria-invalid={validEmailAddress ? "false" : "true"}
                                       aria-describedby="uidnote"
                                       onFocus={() => setEmailAddressFocus(true)}
                                       onBlur={() => setEmailAddressFocus(false)}
                                />
                                <p
                                    id="uidnote"
                                    className={emailAddressFocus && emailAddress && !validEmailAddress ? "instructions" : "offscreen"}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/>
                                    Email supposed to be like this: johnsmith@gmail.com
                                </p>
                            </div>

                            <div className="flex flex-row">
                                {/********************** Password  *******************/}
                                <div className="mx-4">
                                    <label htmlFor="password" className="block mb-2 text-sm">
                                        Password:
                                        <span
                                            className={validPassword ? "valid" : "hide"}
                                        >
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </span>
                                        <span
                                            className={validPassword || !password ? "hide" : "invalid"}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </span>
                                    </label>
                                    <input type="password" name="validPassword" id="validPassword" placeholder="**********"
                                           className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-gray-100"
                                           autoComplete="off"
                                           onChange={(e) => setPassword(e.target.value)}
                                           value={password}
                                           required
                                           aria-invalid={validPassword ? "false" : "true"}
                                           aria-describedby="pwdnote"
                                           onFocus={() => setpasswordFocus(true)}
                                           onBlur={() => setpasswordFocus(false)}
                                    />
                                    <p id="pwdnote"
                                       className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        8 to 24 characters.<br/>
                                        Must include uppercase and lowercase letters, a number and a special character.<br/>
                                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span
                                        aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                                        aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>
                                </div>

                                {/********************** Confirm Password *******************/}
                                <div className="mx-4">
                                    <label htmlFor="confirm_pwd" className="block mb-2 text-sm">
                                        Confirm Password:
                                        <span
                                            className={validPasswordMatch && matchPassword ? "valid" : "hide"}
                                        >
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </span>
                                        <span
                                            className={validPasswordMatch || !matchPassword ? "hide" : "invalid"}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </span>
                                    </label>
                                    <input type="password" name="confirm_pwd" id="confirm_pwd" placeholder="**********"
                                           className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-gray-100"
                                           autoComplete="off"
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
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 my-0 mx-4">
                            <div>
                                <button type="submit"
                                        className="w-full px-8 py-3 font-semibold rounded-md bg-amber-500 text-white">Sign
                                    up
                                </button>
                            </div>
                            <p className="px-6 text-sm text-center text-gray-400">Don't have an account yet?
                                <Link to="/login" rel="noopener noreferrer" href="#" className="hover:underline text-violet-400">Sign
                                    in</Link>.
                            </p>
                        </div>

                    </form>
                </section>
            )}
        </>

    )

};

export default SignupForm;