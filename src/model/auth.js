import axios from '../model/axios.js'; 


export const registerRequest  = user => axios.post(`/doctors`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verityTokenRequest = () => axios.get('/verify', { withCredentials: true });
