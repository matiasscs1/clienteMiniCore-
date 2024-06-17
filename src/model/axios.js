import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://medicaapp.onrender.com',
    withCredentials: true
})

export default instance;

