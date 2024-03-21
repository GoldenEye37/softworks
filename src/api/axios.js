import axios from 'axios';


const BASE_URL = 'https://app.signalgas.io/api/v1';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosAuthenticated =  axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});