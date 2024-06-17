// src/axios.js
import axios from 'axios';
import config from '../config'; // Asegúrate de importar tu configuración

const instance = axios.create({
  baseURL: config.API_URL, // Utiliza la URL base del backend
  withCredentials: true, // Para enviar cookies junto con las solicitudes, si es necesario
});

export default instance;
