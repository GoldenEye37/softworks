import React, { useState } from 'react';
import axios from 'axios';


const signup = async (e) => {

    const API_BASE_URL = 'https://app.signalgas.io/api/v1/customer';

    e.preventDefault();

    try {
        console.log('Signup successful!');
    }catch (error) {
        console.error("SignUp failed, please try again.", error)
    }
};

export default signup;

