import React, { useState, useEffect } from 'react';
import { obtenerDoctorPorId } from '../../controller/Doctor_controller';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controller/AuthContext.jsx';

export function PerfilDoctor() {
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (user != null) {
            obtenerDoctorPorId(user.id)
                .then((resultado) => {
                    if (!resultado) {
                        console.error('Doctor no encontrado');
                        toast.error('No se pudo cargar la información del doctor. Intente más tarde.');
                        navigate('/login');
                    } else {
                        setDoctor(resultado);
                    }
                })
                .catch((error) => {
                    console.error('Hubo un error desconocido:', error);
                    toast.error('Hubo un error desconocido. Intente más tarde.');
                    navigate('/login');
                });
        }
    }, [navigate]);

    if (!doctor) {
        return <p>Cargando...</p>;
    }

    // Función para formatear la fecha en DD-MM-YYYY
    const formatDate = (date) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            return ''; // Retorna una cadena vacía si no es una fecha válida
        }
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Los meses son de 0-11
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-4xl w-full mx-auto bg-white p-8 shadow-lg rounded-lg h-full">
                <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
                    <div className="flex-shrink-0 mb-6 lg:mb-0">
                        <img
                            className="w-32 h-32 rounded-full object-cover"
                            src="https://static.vecteezy.com/system/resources/previews/002/181/615/original/medical-doctor-general-practitioner-physician-profile-avatar-cartoon-vector.jpg"
                            alt="Foto de perfil por defecto"
                        />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(doctor).map(([key, value]) => {
                            const formattedValue = (key.includes('Fecha') || key === 'nacimiento') && value
                                ? formatDate(value)
                                : value;

                            return (
                                <div key={key} className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                                        {key.replace(/_/g, ' ')}
                                    </label>
                                    <input
                                        type={key === 'password' ? 'password' : (key.includes('Fecha') || key === 'nacimiento') ? 'text' : 'text'}
                                        value={typeof formattedValue === 'string' ? formattedValue : ''}
                                        readOnly
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
