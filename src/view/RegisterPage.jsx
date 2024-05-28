import { useForm } from 'react-hook-form';
import { registerRequest } from '../model/auth.js';
import { useAuth } from '../controller/AuthContext.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function RegisterPage() {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) navigate('/login');
    }, [isAuthenticated]);
    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                    registerErrors.map((error, i ) => {
                       
                        <div className='bg-red-500 p-2 text-white'>
                            {error}
                        </div>
                    })
                }
                <form onSubmit={handleSubmit(async (values) => {
                    signup(values);
                })}>

                    <input
                        type="text"
                        {...register("nombre", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Nombre"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.nombre && <p className='text-red-500'>El nombre es requerido</p>}

                    <input
                        type="text"
                        {...register("apellido", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Apellido"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    {errors.apellido && <p className='text-red-500'>El apellido es requerido</p>}

                    <input
                        type="text"
                        {...register("especialidad", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Especialidad"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.especialidad && <p className='text-red-500'>La especialidad es requerido</p>}


                    <input
                        type="text"
                        {...register("telefono", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Teléfono"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.telefono && <p className='text-red-500'>El telefono es requerido</p>}

                    <input
                        type="text"
                        {...register("email", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Email"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    {errors.email && <p className='text-red-500'>El email es requerido</p>}

                    <input
                        type="text"
                        {...register("direccion_Consultorio", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Dirección del Consultorio"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.direccion_Consultorio && <p className='text-red-500'>La direccion del Consultorio es requerido</p>}

                    <input
                        type="text"
                        {...register("ciudad", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Ciudad"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.ciudad && <p className='text-red-500'>La ciudad es requerido</p>}


                    <input
                        type="date"
                        {...register("nacimiento", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Fecha de Nacimiento"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.nacimiento && <p className='text-red-500'>La fecha de nacimiento es requerido</p>}



                    <input
                        type="text"
                        {...register("genero", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Género"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    {errors.genero && <p className='text-red-500'>El genero es requerido</p>}


                    <input
                        type="password"
                        {...register("password", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Contraseña"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    {errors.password && <p className='text-red-500'>La contraseña es requerido</p>}


                    <input
                        type="text"
                        {...register("Número_de_matriculaMedica", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Número de Matrícula Médica"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    {errors.Número_de_matriculaMedica && <p className='text-red-500'>Matricula Requerida</p>}




                    <button type="submit">Registrar</button>


                </form>

            </div>

        </div>
    )
}

export default RegisterPage;

