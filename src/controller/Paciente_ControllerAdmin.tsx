import { Paciente } from '../model/Paciente_Model.ts';
import axios from 'axios';

// agregar pacientes
export const crearPacientes = async (paciente: Paciente): Promise<boolean> => {
    try {
        const response = await axios.post('http://localhost:3000/user', {
            id_doctor: paciente.id_doctor,
            nombres: paciente.nombres,
            apellidos: paciente.apellidos,
            email: paciente.email,
            cedula: paciente.cedula,
            edad: paciente.edad,
            contacto_emergencia: paciente.contacto_emergencia,
            motivo_consulta: paciente.motivo_consulta,
            sintomas: Array.isArray(paciente.sintomas) ? paciente.sintomas : [paciente.sintomas],
            alergias: Array.isArray(paciente.alergias) ? paciente.alergias : [paciente.alergias],
            diagnostico: paciente.diagnostico || '',
            medicamentoAtomar: paciente.medicamentoAtomar || ''
        });
        return true;
    } catch (error) {
        console.error('Error al crear el paciente:', error);
        return false;
    }
};


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
        const response = await axios.get<Paciente[]>(`http://localhost:3000/user/${id_doctor}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        return { data: null, error: 'Hubo un error al obtener los pacientes.' };
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











