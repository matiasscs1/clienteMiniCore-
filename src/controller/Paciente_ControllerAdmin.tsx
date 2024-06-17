import { Paciente } from '../model/Paciente_Model';
import axios from '../model/axios.js'; 

// Agregar pacientes
export const crearPacientes = async (paciente: Paciente): Promise<boolean> => {
    try {
        const response = await axios.post('/user', {
            id_doctor: paciente.id_doctor || '',
            nombres: paciente.nombres || '',
            apellidos: paciente.apellidos || '',
            email: paciente.email || '',
            cedula: paciente.cedula || '',
            edad: paciente.edad || '',
            contacto_emergencia: paciente.contacto_emergencia || '',
            motivo_consulta: paciente.motivo_consulta,
            sintomas: Array.isArray(paciente.sintomas) ? paciente.sintomas : [paciente.sintomas] || '',
            alergias: Array.isArray(paciente.alergias) ? paciente.alergias : [paciente.alergias] || '',
            diagnostico: paciente.diagnostico || '',
            medicamentoAtomar: paciente.medicamentoAtomar || '',
            porcentajeCoincidencia: paciente.porcentajeCoincidencia || 0
        });
        return true;
    } catch (error) {
        console.error('Error al crear el paciente:', error);
        return false;
    }
};

// Editar los pacientes por id de paciente pero solo síntomas y alergias
export async function editarPacientesSA(id_paciente: string, sintomas: string[], alergias: string[]): Promise<boolean> {
    try {
        const response = await axios.put(`/userEditarSA/${id_paciente}`, {
            sintomas: sintomas,
            alergias: alergias
        });
        return true;
    } catch (error) {
        console.error('Error al editar el paciente:', error);
        return false;
    }
}

// Editar los medicamentos
export async function editarPacientesM(id_paciente: string, medicamentoAtomar: string[]): Promise<boolean> {
    try {
        const response = await axios.put(`/userEditarM/${id_paciente}`, {
            medicamentoAtomar: medicamentoAtomar
        });
        return true;
    } catch (error) {
        console.error('Error al editar el paciente:', error);
        return false;
    }
}

// Ver si la receta es buena
export async function remondecacionReceta(id: string) {
    try {
        const response = await fetch(`/receta/${id}`);
        const data = await response.json();

        if (response.status === 200) {
            return { success: true, data: data };
        } else {
            return { success: false, status: response.status, message: data.message };
        }
    } catch (error) {
        console.error('Error en la recomendación de receta:', error);
        return { success: false, message: error.message };
    }
}

export const ObterPacientes = async (): Promise<{ data: Paciente[] | null; error: string | null }> => {
    try {
        const response = await axios.get<Paciente[]>('/user');
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        return { data: null, error: 'Hubo un error al obtener los doctores.' };
    }
};

export async function ObterPacientes_idDocotor(id_doctor): Promise<{ data: Paciente[] | null; error: string | null }> {
    try {
        const response = await axios.get<Paciente[]>(`/user/${id_doctor}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        return { data: null, error: 'Hubo un error al obtener los pacientes.' };
    }
}

export async function eliminarPacientes(cedula: string): Promise<boolean> {
    try {
        const url = '/user';
        await axios.delete(url, { data: { cedula } }); // Envía el objeto JSON con el correo electrónico
        return true;
    } catch (error) {
        if (error.response?.status === 404) {
            console.log('No se encontró la cédula a eliminar');
        } else {
            console.log('Ocurrió un error al eliminar el paciente:', error);
        }
        return false;
    }
}

// Obtener paciente por id
export async function obtenerPacientePorId(id: string): Promise<{ data: Paciente | null; error: string | null }> {
    try {
        const response = await axios.get<Paciente>(`/user/paciente/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        return { data: null, error: 'Hubo un error al obtener el paciente.' };
    }
}

// Filtro
export async function obtenerPacientePorFiltro(filtro: { fechaInicio: string, fechaFin: string, porcentajeMin: number, porcentajeMax: number }): Promise<{ data: Paciente[] | null; error: string | null }> {
    try {
        const response = await axios.post<Paciente[]>('/filtro', filtro);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        return { data: null, error: 'Hubo un error al obtener el paciente.' };
    }
}
