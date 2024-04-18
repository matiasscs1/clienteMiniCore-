import { useForm } from 'react-hook-form';
import { useAuth } from '../controller/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function LoginPage() {

    const { register, handleSubmit } = useForm();
    const { signin, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) navigate('/')
    }, [isAuthenticated]);


    const onSubmit = handleSubmit((data) => {
        signin(data);
    });
    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='text-2xl text-center text-white'>Login</h1>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register("email", {
                            required: { value: true, message: "Campo requerido" }
                        })}
                        placeholder="Email"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errores.email && <p className='text-red-500'>email requerido</p>}

                    <input
                        type="password"
                        {...register("password", {
                            required: {value: true, message: "Campo requerido"}
                        })}
                        placeholder= "Contraseña"
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    <button type="submit">Inciar sesion</button>


                </form>
            </div>
        </div>
    )
}

export default LoginPage;