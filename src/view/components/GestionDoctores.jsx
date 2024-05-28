import { obtenerDoctores, eliminarDoctores, actualizarDoctor, obtenerDoctorPorId } from "../../controller/Doctor_controller";
import React, { useState, useEffect } from 'react';
import { EnvelopeIcon } from '@heroicons/react/20/solid'
import { set, useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'



export function GestionDoctores() {
  const [doctores, setDoctores] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);
  ////
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const abrirModal = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };


  useEffect(() => {
    // Llama a la función obtenerDoctores y actualiza el estado con los datos obtenidos
    obtenerDoctores().then((resultado) => {
      if (resultado.error) {
        console.error(resultado.error);
      } else {
        setDoctores(resultado.data);
      }
    }).catch(error => {
      console.error('Hubo un error desconocido:', error);
    });
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const validar = await eliminarDoctores(data.email);
      if (!validar) {
        toast.error('El correo es invalido, verifica si es la correo es correcto');
        reset();
      } else {
        // Después de eliminar, actualiza la lista de doctores
        const updatedDoctores = await obtenerDoctores();
        if (updatedDoctores.error) {
          console.error(updatedDoctores.error);
        } else {
          setDoctores(updatedDoctores.data);
          reset();
        }

      }

    } catch (error) {
      console.error('Error al eliminar el doctor:', error);
    }
  });

  // para actualizar los doctores


  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      data._id = selectedDoctor._id;
      console.log(data);
      const validar = await actualizarDoctor(data, selectedDoctor._id);
      if (!validar) {
        toast.error('Erro al actualizar existen datos que estan repetidos en el sistema');
        reset();
      } else {
        // Después de actualizar, actualiza la lista de doctores
        const updatedDoctores = await obtenerDoctores();
        if (updatedDoctores.error) {
          console.error(updatedDoctores.error);
        } else {
          setDoctores(updatedDoctores.data);
          reset();
        }
      }
    } catch (error) {
      console.error('Error al actualizar el doctor:', error);
    }
  });




  return (

    <div className="px-4 sm:px-6 lg:px-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input

                {...register("email")}
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
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
                    Direccion del consultorio
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Especialidad
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    matricula
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
                {doctores.map((person) => (
                  <tr key={person._id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-11 w-11 rounded-full" src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {person.nombre} {person.apellido}
                          </div>

                          <div className="mt-1 text-gray-500">{person.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{person.direccion_Consultorio}</div>
                      <div className="mt-1 text-gray-500">{person.ciudad}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.especialidad}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.Número_de_matriculaMedica}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {new Date(person.nacimiento).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                        <div className="mt-1 text-gray-500">
                          Celular: {person.telefono}
                        </div>


                      </div>
                      <div className="mt-1 text-gray-500">{person.genero}</div>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-3 text-right text-sm font-medium sm:pr-0">
                      <a onClick={() => abrirModal(person)} className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {person._id}</span>
                      </a>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Transition.Root show={open} as={Fragment}>
              <Dialog className="relative z-10" onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <form onSubmit={onSubmitUpdate}>
                          <div >
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Editar la informacion de un doctor</h2>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                              Ingrese la informacion donde quiere editar
                            </p>

                            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Nombre
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("nombre")}
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    autoComplete="given-name"
                                    defaultValue={selectedDoctor ? selectedDoctor.nombre : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Apellido
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("apellido")}
                                    type="text"
                                    name="apellido"
                                    id="apellido"
                                    autoComplete="family-name"
                                    defaultValue={selectedDoctor ? selectedDoctor.apellido : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="especialidad" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Especialidad
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("especialidad")}
                                    id="especialidad"
                                    name="especialidad"
                                    type="especialidad"
                                    defaultValue={selectedDoctor ? selectedDoctor.especialidad : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Teléfono Celular
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("telefono")}
                                    id="telefono"
                                    name="telefono"
                                    type="telefono"
                                    autoComplete="telefono"
                                    defaultValue={selectedDoctor ? selectedDoctor.telefono : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Correo Electrónico
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("email")}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    defaultValue={selectedDoctor ? selectedDoctor.email : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Dirección del Consultorio
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("direccion")}
                                    id="direccion"
                                    name="direccion"
                                    type="text"
                                    autoComplete="direccion"
                                    defaultValue={selectedDoctor ? selectedDoctor.direccion_Consultorio : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="ciudad" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Ciudad
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("ciudad")}
                                    id="ciudad"
                                    name="ciudad"
                                    type="text"
                                    autoComplete="ciudad"
                                    defaultValue={selectedDoctor ? selectedDoctor.ciudad : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="genero" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Género
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("genero")}
                                    id="genero"
                                    name="genero"
                                    type="text"
                                    autoComplete="genero"
                                    defaultValue={selectedDoctor ? selectedDoctor.genero : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="matricula" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                                  Número de Matrícula Médica
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register("matricula")}
                                    id="matricula"
                                    name="matricula"
                                    type="text"
                                    autoComplete="matricula"
                                    defaultValue={selectedDoctor ? selectedDoctor.Número_de_matriculaMedica : ""}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>



                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={() => setOpen(false)}
                            >
                              Editar
                            </button>
                          </div>


                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      </div>
    </div>
  )

}  
