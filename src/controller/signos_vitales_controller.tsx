import {signos_vitales_model} from '../model/signos_vitales_model.ts';
import axios from 'axios';

// obtener signos vitales 
export const obtenerSignosVitales = async (): Promise<{ data: signos_vitales_model[] | null; error: string | null }> => {
    try {
        const response = await axios.get<signos_vitales_model[]>('http://localhost:3000/signos_vitalesGet');
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error al obtener los signos vitales:', error);
        return { data: null, error: 'Hubo un error al obtener los signos vitales.' };
    }
};

export const crearSignosVitales = async (signosVitales: signos_vitales_model): Promise<boolean> => {
    try {
        // Obtener todos los signos vitales existentes
        const checkResponse = await obtenerSignosVitales();
        
        if (checkResponse.data) {
            // Verificar si ya existe un registro con el mismo id_paciente
            const existeRegistro = checkResponse.data.some(sv => sv.id_paciente === signosVitales.id_paciente);
            if (existeRegistro) {
                console.log('El registro ya existe para el id_paciente:', signosVitales.id_paciente);
                return true; // El registro ya existe, no crear uno nuevo
            }
        }
        const response = await axios.post('http://localhost:3000/signos_vitales', {
            id_paciente: signosVitales.id_paciente,
            temperatura: signosVitales.temperatura || '',
            pulso: signosVitales.pulso || '',
            presionArterial: signosVitales.presionArterial || '',
            peso: signosVitales.peso || '',
            estatura: signosVitales.estatura || ''
        });
        console.log(response);
        return true;
    } catch (error) {
        console.error('Error al crear los signos vitales:', error.response?.data || error.message); // Detalles del error
        return false;
    }
};

// editar signos vitales 
export const editarSignosVitales = async (id: string, signosVitales: signos_vitales_model): Promise<boolean> => {
    try {
        const response = await axios.put(`http://localhost:3000/Editarsignos_vitales/${id}`, signosVitales);

        if (response.status === 200) {
            return true;
        } else {
            console.error('Error al editar los signos vitales: respuesta inesperada del servidor', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error al editar los signos vitales:', error);
        return false;
    }
};