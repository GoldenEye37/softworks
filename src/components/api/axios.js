import axios from 'axios';

export default axios.create({
    baseURL: 'https://app.signalgas.io/api/v1'
});