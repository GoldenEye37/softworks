import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";

import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const LOGIN_URL = 'https://app.signalgas.io/api/v1/customer/signin';

const Login = () => {
    // navigation
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    // initialize auth context
    const { setAuth } = useContext(AuthContext);

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

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
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
            var customer = response?.data?.customer;
            setAuth({ email, password, customer, accessToken, isAuthenticated: true });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            // todo
            if (!err?.response) {
                setErrMsg('No Server Response');
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
            (
                <section
                    className="flex m-6 p-12 h-fullflex-col max-w-md rounded-md sm:p-10 bg-gray-600 text-gray-100"
                >
                    <div className=" my-0 mb-2 text-center">
                        <h1 className="my-3 text-2xl font-bold m-0 p-0">Log In </h1>
                        <p className="text-sm text-gray-400 m-0 p-0">to Get Started</p>
                    </div>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form noValidate="" action="" className="space-y-4 min-w-64" onSubmit={handleLogin}>
                        {/********************** Email Address *******************/}
                        <div className="mx-4">
                            <label htmlFor="emailAddress" className="block mb-2 text-sm">
                                Email Address:
                            </label>
                            <input type="text" name="emailAddress" id="emailAddress" placeholder="jsmith@gmail.com"
                                   className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-gray-100"
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
                                   className=" w-full px-16 py-16 border rounded-md border-gray-400 bg-gray-500 text-sm text-gray-100"
                                   autoComplete="off"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   required
                            />
                        </div>
                        <div className="space-y-2 my-0 mx-4">
                            <div>
                                <button type="submit"
                                        onSubmit={handleLogin}
                                        className="w-full px-8 py-3 font-semibold rounded-md bg-amber-500  text-white">Login
                                </button>
                            </div>
                            <p className="px-6 text-sm text-center text-gray-400">Don't have an account yet?
                                <Link to="/signup" rel="noopener noreferrer" href="#" className="hover:underline text-violet-400">Sign
                                    up</Link>.
                            </p>
                        </div>
                    </form>

                </section>
            )
        </>
    )
}

export default Login