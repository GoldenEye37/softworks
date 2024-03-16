import React, { useState } from 'react';
import axios from 'axios';


const signup = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://app.signalgas.io/api/v1/customer/signup', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Signup successful!', response.data);
    }catch (error) {
        console.error("SignUp failed, please try again.", error)
    }
};

export default signup;

