import { ObterPacientes, eliminarPacientes, ObterPacientes_idDocotor } from "../../controller/Paciente_ControllerAdmin";
import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';


import { toast } from 'react-toastify';




export function GestionPaciente() {
    const [pacientes, setPacientes] = useState([]);
    const { register, handleSubmit, reset } = useForm();
   

    useEffect(() => {
        // Llama a la función obtenerDoctores y actualiza el estado con los datos obtenidos
        ObterPacientes().then((resultado) => {

            setPacientes(resultado.data);


        }).catch(error => {
            console.error('Hubo un error desconocido:', error);
        });
    }, []);







    // para eliminar un paciente
    const onSubmit = handleSubmit(async (data) => {
        try {




            

            const validar = await eliminarPacientes(data.cedula);
            if (!validar) {
                toast.error('La cedula es invalida, verifica si es la cedula correcta');
                reset();

            } else {
                // Después de eliminar, actualiza la lista de doctores
                const updatedPacientes = await ObterPacientes();
                if (updatedPacientes.error) {
                    console.error(updatedPacientes.error);
                } else {
                    setPacientes(updatedPacientes.data);
                    reset();
                }

            }





        } catch (error) {
            console.error('Hubo un error desconocido:', error);
        }
    });




    return (

        <div className="px-4 sm:px-6 lg:px-8">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <label htmlFor="account-number" className="block text-sm font-medium leading-6 text-gray-900">
                            Cedula
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                                {...register("cedula")}
                                type="text"
                                name="cedula"
                                id="cedula"
                                className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="000-00-0000"
                            />

                        </div>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Eliminar
                            </button>

                        </div>

                    </div>





                </div>

                <div className="sm:flex sm:items-center">

                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <label htmlFor="account-number" className="block text-sm font-medium leading-6 text-gray-900">
                                id del doctor
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    {...register("id_doctor")}
                                    type="text"
                                    name="id_doctor"
                                    id="id_doctor"
                                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="000-00-0000"

                                />
                            </div>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>







            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Nombres
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Motivo de la consulta
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Cedula
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Edad
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Otros datos
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr- sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {
                                    pacientes.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-sm text-gray-500 text-center">
                                                No hay pacientes registrados
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {pacientes.map((paciente) => (
                                                <tr key={paciente._id}>
                                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                        <div className="flex items-center">
                                                            <div className="h-11 w-11 flex-shrink-0">
                                                                <img className="h-11 w-11 rounded-full" src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="font-medium text-gray-900">
                                                                    {paciente.nombres} {paciente.apellidos}
                                                                </div>

                                                                <div className="mt-1 text-gray-500">{paciente.contacto_emergencia}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div className="text-gray-900">{paciente.motivo_consulta}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{paciente.cedula}</td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{paciente.edad}</td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div className="text-gray-900">
                                                            <div className="mt-1 text-gray-500">
                                                                Sintomas: {paciente.sintomas}
                                                            </div>
                                                            <div className="mt-1 text-gray-500">
                                                                Alergias: {paciente.alergias}
                                                            </div>
                                                            <div className="mt-1 text-gray-500">
                                                                Diagnostico: {paciente.diagnostico}
                                                            </div>
                                                            <div className="mt-1 text-gray-500">
                                                                Receta: {paciente.medicamentoAtomar}
                                                            </div>


                                                        </div>

                                                    </td>
                                         
                                                </tr>
                                            ))}

                                        </>
                                    )
                                }

                            </tbody>
                        </table>
                       
                    </div>
                </div>
            </div>
        </div>

    )

}  
