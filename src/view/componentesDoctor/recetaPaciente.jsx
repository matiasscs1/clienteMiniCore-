import React, { useState, useEffect, Fragment } from 'react';
import { Combobox, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../controller/AuthContext.jsx';
import { ObterPacientes_idDocotor, editarPacientesM, remondecacionReceta, obtenerPacientePorFiltro } from '../../controller/Paciente_ControllerAdmin';
import jsPDF from 'jspdf';

export function RecetaPaciente() {
    const [abrirDiv, setAbrirDiv] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const [pacientes, setPacientes] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [medicamentos, setMedicamentos] = useState([]);
    const [selectedSintomas, setSelectedSintomas] = useState([]);
    const [selectedAlergias, setSelectedAlergias] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [porcentajeMin, setPorcentajeMin] = useState('');
    const [porcentajeMax, setPorcentajeMax] = useState('');
    const [filtro, setFiltro] = useState([]);

    useEffect(() => {
        if (user) {
            ObterPacientes_idDocotor(user.id).then((resultado) => {
                if (resultado.error) {
                    console.error(resultado.error);
                } else {
                    setPacientes(resultado.data);
                }
            }).catch(error => {
                console.error('Hubo un error desconocido:', error);
            });
        }
    }, [user]);

    const filteredPeople = query === ''
        ? pacientes
        : pacientes.filter((person) => {
            return person.nombres.toLowerCase().includes(query.toLowerCase());
        });

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const medicamentosList = [
        'Paracetamol',
        'Ibuprofeno',
        'Pseudoefedrina',
        'Dextrometorfano',
        'Oseltamivir',
        'Remdesivir',
        'Vitamina D',
        'Zinc',
        'Antibióticos',
        'Albuterol',
        'Acetilcisteína',
        'Beclometasona',
        'Montelukast',
        'Isoniazida',
        'Rifampicina',
        'Pirazinamida',
        'Etambutol',
        'Mometasona',
        'Salmeterol',
        'Tiotropio',
        'Fluticasona',
        'Prednisona',
        'Oxigenoterapia',
        'Tratamiento específico',
        'Heparina',
        'Warfarina',
        'Apixabán',
        'Pirfenidona',
        'Nintedanib',
        'Soporte ventilatorio',
        'Ribavirina',
        'Metotrexato',
        'ninguna'
    ];

    const handleSave = async () => {
        if (selectedPerson) {
            try {
                const success = await editarPacientesM(selectedPerson._id, medicamentos.join(', '));
                if (success) {
                    toast.success('Paciente editado con éxito');
                    setMedicamentos([]);
                } else {
                    toast.error('Error al editar el paciente');
                }
            } catch (error) {
                console.error('Error al enviar los datos:', error);
                toast.error('Error al enviar los datos o el paciente tiene alergias al medicamento');
            }
        } else {
            console.error('No hay paciente seleccionado.');
            toast.error('No hay paciente seleccionado');
        }
    };

    const handleSave2 = async () => {
        try {
            const resultRecomendacionReceta = await remondecacionReceta(selectedPerson._id);

            if (resultRecomendacionReceta.success) {
                const { recomendacion, porcentajeCoincidencia } = resultRecomendacionReceta.data;
                toast.success(`Recomendación de receta enviada con éxito. Coincidencia: ${porcentajeCoincidencia}%`);
            } else if (resultRecomendacionReceta.status === 500) {
                toast.error('Error 500: Se debe cambiar la receta.');
                return;  // Detener procesamiento posterior
            } else {
                toast.error(`Error al enviar la recomendación de receta: ${resultRecomendacionReceta.message}`);
                return;  // Detener procesamiento posterior
            }
        } catch (error) {
            console.error('Error al procesar la receta:', error.message);
            toast.error('Error inesperado al procesar la receta.');
        }
    };

    const handleFilterAndGeneratePDF = async () => {
        const filtro = {
            fechaInicio,
            fechaFin,
            porcentajeMin: parseInt(porcentajeMin),
            porcentajeMax: parseInt(porcentajeMax)
        };

        try {
            const result = await obtenerPacientePorFiltro(filtro);
            if (result.error) {
                toast.error(result.error);
            } else {
                setFiltro(result.data);
                generatePDF(result.data);
            }
        } catch (error) {
            console.error('Error al obtener los pacientes filtrados:', error);
            toast.error('Error inesperado al obtener los pacientes filtrados.');
        }
    };

    const generatePDF = (pacientes) => {
        const doc = new jsPDF();
        pacientes.forEach((paciente, index) => {
            doc.text(`Paciente ${index + 1}`, 10, 10 + index * 140);
            doc.text(`ID Doctor: ${paciente.id_doctor}`, 10, 20 + index * 140);
            doc.text(`Nombres: ${paciente.nombres}`, 10, 30 + index * 140);
            doc.text(`Apellidos: ${paciente.apellidos}`, 10, 40 + index * 140);
            doc.text(`Email: ${paciente.email}`, 10, 50 + index * 140);
            doc.text(`Cédula: ${paciente.cedula}`, 10, 60 + index * 140);
            doc.text(`Edad: ${paciente.edad}`, 10, 70 + index * 140);
            doc.text(`Contacto de Emergencia: ${paciente.contacto_emergencia}`, 10, 80 + index * 140);
            doc.text(`Motivo de Consulta: ${paciente.motivo_consulta}`, 10, 90 + index * 140);
            doc.text(`Síntomas: ${paciente.sintomas?.join(', ')}`, 10, 100 + index * 140);
            doc.text(`Alergias: ${paciente.alergias?.join(', ')}`, 10, 110 + index * 140);
            doc.text(`Diagnóstico: ${paciente.diagnostico}`, 10, 120 + index * 140);
            doc.text(`Medicamentos a Tomar: ${paciente.medicamentoAtomar.join(', ')}`, 10, 130 + index * 140);
        });
        doc.save('pacientes_filtrados.pdf');
    };

    return (
        <div className="filterPading min-h-screen bg-gray-100 p-4">
            <ToastContainer />
            <Combobox
                as="div"
                value={selectedPerson}
                onChange={(person) => {
                    setQuery('');
                    setSelectedPerson(person);
                    setSelectedSintomas(Array.isArray(person.sintomas) ? person.sintomas : (typeof person.sintomas === 'string' ? person.sintomas.split(', ').filter(Boolean) : []));
                    setSelectedAlergias(Array.isArray(person.alergias) ? person.alergias : (typeof person.alergias === 'string' ? person.alergias.split(', ').filter(Boolean) : []));
                }}
            >
                <label className="block text-sm font-medium leading-6 text-gray-900">Elegir Paciente para ver el diagnóstico</label>
                <div className="relative mt-2">
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(person) => person?.nombres && person?.apellidos ? `${person.nombres} ${person.apellidos}` : ''}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>

                    {filteredPeople.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredPeople.map((person) => (
                                <Combobox.Option
                                    key={person._id}
                                    value={person}
                                    className={({ active }) =>
                                        classNames(
                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            <div className="flex items-center">
                                                <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                                                <span className={classNames('ml-3 truncate', selected && 'font-semibold')}>{person.nombres} {person.apellidos}</span>
                                            </div>
                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                                        active ? 'text-white' : 'text-indigo-600'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>

            <button
                onClick={() => setAbrirDiv(true)}
                className="mt-6 inline-flex items-center px-4 py-2 mr-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Ver el Diagnóstico
            </button>

            {abrirDiv && (
                <>
                    <h1 className="text-3xl font-bold text-center mb-4">
                        Enfermedad Diagnosticada: {selectedPerson?.diagnostico}
                    </h1>
                    <div className="col-span-1 mt-4">
                        <Listbox value={medicamentos} onChange={setMedicamentos} multiple>
                            {({ open }) => (
                                <>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            <span className="block truncate">
                                                {medicamentos.length > 0 ? medicamentos.join(', ') : 'Seleccionar Medicamentos a recetar'}
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {medicamentosList.map((medicamento, index) => (
                                                    <Listbox.Option
                                                        key={index}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-8 pr-4'
                                                            )
                                                        }
                                                        value={medicamento}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {medicamento}
                                                                </span>
                                                                {selected && (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-6 inline-flex items-center px-4 py-2 pl-4 mr-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Recetar
                    </button>

                    <button
                        onClick={handleSave2}
                        className="mt-6 inline-flex items-center px-4 py-2 pl-4 mr-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Ver si tiene alergias y recomendaciones
                    </button>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                            <input
                                type="date"
                                id="fechaInicio"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha Fin</label>
                            <input
                                type="date"
                                id="fechaFin"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="porcentajeMin" className="block text-sm font-medium text-gray-700">Porcentaje Mínimo</label>
                            <input
                                type="number"
                                id="porcentajeMin"
                                value={porcentajeMin}
                                onChange={(e) => setPorcentajeMin(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="porcentajeMax" className="block text-sm font-medium text-gray-700">Porcentaje Máximo</label>
                            <input
                                type="number"
                                id="porcentajeMax"
                                value={porcentajeMax}
                                onChange={(e) => setPorcentajeMax(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleFilterAndGeneratePDF}
                        className="mt-6 inline-flex items-center px-4 py-2 pl-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Filtrar y Generar PDF
                    </button>
                </>
            )}
        </div>
    );
}
