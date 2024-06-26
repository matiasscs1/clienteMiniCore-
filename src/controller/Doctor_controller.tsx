import { DoctorModel } from '../model/Doctor_model';
import axios from '../model/axios.js'; 


export const obtenerDoctores = async (): Promise<{ data: DoctorModel[] | null; error: string | null }> => {
    try {
        const response = await axios.get<DoctorModel[]>('/doctors');
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        return { data: null, error: 'Hubo un error al obtener los doctores.' };
    }
};

export async function eliminarDoctores(email: string): Promise<boolean> {
    try {
        await axios.delete('/doctors', { data: { email } }); // Envía el objeto JSON con el correo electrónico
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

export async function obtenerDoctorPorId(_id: string): Promise<DoctorModel | null> {
    try {
        const response = await axios.get<DoctorModel>(`/doctors/${_id}`, {
            headers: {
                'Cache-Control': 'no-cache', // Desactiva la caché para esta solicitud
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el doctor por ID:', error);
        return null;
    }
}

export const mesRegistroDoctores = async () => {
    try {
        const { data, error } = await obtenerDoctores(); // Obtener los datos y el error desde obtenerDoctores
        if (error) {
            console.error('Error al obtener los doctores:', error);
            return null; // Retorna null si hay un error
        }
        
        const mesRegistroArray = Array.from({ length: 12 }, () => 0); // Array inicializado con 12 espacios, cada uno con valor 0
        
        if (data) {
            data.forEach((doctor: DoctorModel) => { // Utilizar forEach en el array de doctores dentro de data
                const fechaRegistro = new Date((doctor as any).Fecha_de_Registro); // Type assertion to ensure "doctor" has "Fecha_de_Registro" property
                
                const mesRegistro = fechaRegistro.getMonth(); // Obtener el mes de la fecha de registro (0-11)
                mesRegistroArray[mesRegistro] += 1; // Incrementar el contador del mes de registro
            });
        }
        return mesRegistroArray; // Devolver solo el array con el número de doctores registrados por mes
    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        return null; // Retorna null si hay un error
    }
}

export async function actualizarDoctor(doctor: DoctorModel, _id: String): Promise<boolean> {
    try {
        await axios.put(`/doctors/${_id}`, doctor);
        return true;
    } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 500) {
            console.log('Datos ya registrados en el sistema, no se puede repetir');
        } else {
            console.log('Ocurrió un error al actualizar el paciente:', error);
        }
        return false;
    }
}

export async function diagnostico(_id: String): Promise<boolean> {
    try {
        await axios.post(`/diagnosticado/${_id}`);
        return true;
    } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 500) {
            console.log('Datos ya registrados en el sistema, no se puede repetir');
        } else {
            console.log('Ocurrió un error al registrar el diagnóstico:', error);
        }
        return false;
    }
}

export async function guardarReceta(_id: String): Promise<boolean> {
    try {
        await axios.get(`/receta/${_id}`);
        return true;
    } catch (error) {
        if (error.response?.status === 404 || error.response?.status === 500) {
            console.log('Datos ya registrados en el sistema, no se puede repetir');
        } else {
            console.log('Ocurrió un error al guardar la receta:', error);
        }
        return false;
    }
}
