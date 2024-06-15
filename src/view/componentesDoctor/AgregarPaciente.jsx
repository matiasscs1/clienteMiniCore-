import React, { useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../controller/AuthContext.jsx';
import { crearPacientes } from '../../controller/Paciente_ControllerAdmin.tsx';



export function AgregarPaciente() {
    const [paciente, setPaciente] = useState({
        id_doctor: '',
        nombres: '',
        apellidos: '',
        email: '',
        cedula: '',
        edad: '',
        contacto_emergencia: '',
        motivo_consulta: '',
        sintomas: [],
        alergias: []

    });

    const { user } = useAuth();




    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaciente({ ...paciente, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Formatear los síntomas seleccionados en un string separado por comas
        const formattedPaciente = {
            ...paciente,
            id_doctor: user.id,

        };


        const response = await crearPacientes(formattedPaciente);

        if (response) {
            toast.success('Paciente creado exitosamente');
            setPaciente({
                id_doctor: '',
                nombres: '',
                apellidos: '',
                email: '',
                cedula: '',
                edad: '',
                contacto_emergencia: '',
                motivo_consulta: ''
            });

        } else {
            toast.error('Error al crear el paciente');
        }
    };



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="nombres"
                        value={paciente.nombres}
                        onChange={handleChange}
                        placeholder="Nombres"
                        className="col-span-1 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="apellidos"
                        value={paciente.apellidos}
                        onChange={handleChange}
                        placeholder="Apellidos"
                        className="col-span-1 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        value={paciente.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="col-span-1 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="cedula"
                        value={paciente.cedula}
                        onChange={handleChange}
                        placeholder="Cédula"
                        className="col-span-1 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        name="edad"
                        value={paciente.edad}
                        onChange={handleChange}
                        placeholder="Edad"
                        className="col-span-1 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="contacto_emergencia"
                        value={paciente.contacto_emergencia}
                        onChange={handleChange}
                        placeholder="Contacto de Emergencia"
                        className="col-span-1 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="motivo_consulta"
                        value={paciente.motivo_consulta}
                        onChange={handleChange}
                        placeholder="Motivo de Consulta"
                        className="col-span-1 p-2 border border-gray-300 rounded"
                    />

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Registrar Paciente
                    </button>
                </form>
            </div>
        </div>
    );
}
