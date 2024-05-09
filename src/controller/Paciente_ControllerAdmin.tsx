import { Paciente } from '../model/Paciente_Model.ts';
import axios from 'axios';


export const ObterPacientes = async (): Promise<{ data: Paciente[] | null; error: string | null }> => {
    try {
        const response = await axios.get<Paciente[]>('http://localhost:3000/user');
        return { data: response.data, error: null };

    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        return { data: null, error: 'Hubo un error al obtener los doctores.' };
    }
};

export async function ObterPacientes_idDocotor(id_doctor): Promise<{ data: Paciente[] | null; error: string | null }> {
    try {
        const response = await axios.get<Paciente[]>(`http://localhost:3000/user/${id_doctor}`); // hacerle por id_doctor
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        return { data: null, error: 'Hubo un error al obtener los doctores.' };
    }
}

export async function eliminarPacientes(cedula: string): Promise<boolean> {
    try {
        const url = 'http://localhost:3000/user';
        await axios.delete(url, { data: { cedula } }); // Envía el objeto JSON con el correo electrónico
        return true;
    } catch (error) {
        if (error.response.status === 404) {
            console.log('No se encontró la cédula a eliminar');
        } else {
            console.log('Ocurrió un error al eliminar el paciente:', error);
        }
        return false;
    }
}











