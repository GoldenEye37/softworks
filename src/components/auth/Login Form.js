import React, { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "./context/AuthProvider"; // todo

import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
// import axios from './api/axios'; // todo
const LOGIN_URL = '/auth'; // todo

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            // setAuth({ user, pwd, roles, accessToken }); todo
            setEmail('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section
                    className="flex m-6 p-12 h-fullflex-col max-w-md rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100"
                >
                    <div className=" my-0 mb-2 text-center">
                        <h1 className="my-3 text-2xl font-bold m-0 p-0">Log In </h1>
                        <p className="text-sm dark:text-gray-400 m-0 p-0">to Get Started</p>
                    </div>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form noValidate="" action="" className="space-y-4 min-w-64" onSubmit={handleLogin}>
                        {/********************** Email Address *******************/}
                        <div className="mx-4">
                            <label htmlFor="emailAddress" className="block mb-2 text-sm">
                                Email Address:
                            </label>
                            <input type="text" name="emailAddress" id="emailAddress" placeholder="jsmith@gmail.com"
                                   className=" w-full px-16 py-16 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                   ref={emailRef}
                                   autoComplete="off"
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                                   aria-describedby="uidnote"
                            />
                        </div>

                        {/********************** Password  *******************/}
                        <div className="mx-4">
                            <label htmlFor="password" className="block mb-2 text-sm">
                                Password:
                            </label>
                            <input type="password" name="password" id="password" placeholder="**********"
                                   className=" w-full px-16 py-16 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                   autoComplete="off"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   required
                            />
                        </div>
                    </form>
                    <div className="space-y-2 my-0 mx-4">
                        <div>
                            <button type="submit"
                                    className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">Login
                            </button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
                            <a rel="noopener noreferrer" href="#" className="hover:underline dark:text-violet-400">Sign
                                up</a>.
                        </p>
                    </div>
                </section>
            )}
        </>
    )
}

export default Login