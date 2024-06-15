import React, { useState, useEffect, Fragment } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ObterPacientes_idDocotor, editarPacientesSA } from '../../controller/Paciente_ControllerAdmin';
import { crearSignosVitales, editarSignosVitales } from '../../controller/signos_vitales_controller';
import { diagnostico } from '../../controller/Doctor_controller';

import './css/style.css';
import { useAuth } from '../../controller/AuthContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function DiagnosticoPaciente() {
    const [selectedSintomas, setSelectedSintomas] = useState([]);
    const [selectedAlergias, setSelectedAlergias] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const { user, isAuthenticated } = useAuth();

    const [selectedTemperatura, setSelectedTemperatura] = useState('');
    const [selectedPulso, setSelectedPulso] = useState('');
    const [selectedPresion, setSelectedPresion] = useState('');
    const [selectedPeso, setSelectedPeso] = useState('');
    const [selectedEstatura, setSelectedEstatura] = useState('');


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

    const sintomas = [
        'tos', 'fiebre', 'fatiga', 'dolor de cabeza', 'congestión nasal',
        'fiebre alta', 'dolores musculares', 'dificultad para respirar', 'pérdida de olfato y gusto',
         'flema', 'opresión en el pecho', 'sudores nocturnos', 'pérdida de peso',
        'dificultad para tragar', 'dolor facial', 'dolor de oído', 'pérdida de audición', 'ronquera',
        'pérdida de voz', 'sibilancias', 'hinchazón en las piernas', 'dolor de garganta', 'dolores en las piernas',
        'dificultad para respirar severa', 'sibilancias', 'ronquidos', 'dolores en el pecho', 'dolores en los músculos',
        'hinchazón en las piernas', 'fiebre del valle', 'dificultad para respirar severa', 'fiebre', 'dolores en el pecho',
        'sibilancias', 'sudores nocturnos', 'fiebre', 'tos severa', 'fatiga', 'dificultad para respirar', 'tos persistente'
    ];

    const alergias = [
        'Paracetamol', 'Ibuprofeno', 'Pseudoefedrina', 'Dextrometorfano',
        'Oseltamivir', 'Remdesivir', 'Vitamina D', 'Zinc',
        'Antibióticos', 'Albuterol', 'Acetilcisteína', 'Beclometasona',
        'Montelukast', 'Isoniazida', 'Rifampicina', 'Pirazinamida',
        'Etambutol', 'Mometasona', 'Salmeterol', 'Tiotropio',
        'Fluticasona', 'Prednisona', 'Oxigenoterapia', 'Tratamiento específico',
        'Heparina', 'Warfarina', 'Apixabán', 'Pirfenidona',
        'Nintedanib', 'Soporte ventilatorio', 'Ribavirina', 'Metotrexato', 'ninguna'
    ];

    const signosVitales = [
        'normal', 'elevado'
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const handleSave = async () => {
        if (selectedPerson) {
            try {
                // Crear signos vitales con valores fijos
                const initialSignos = {
                    id_paciente: selectedPerson._id,
                    temperatura: '.',
                    pulso: '.',
                    presionArterial: '.',
                    peso: '.',
                    estatura: '.'
                };

                console.log(initialSignos);

                const signosInitSuccess = await crearSignosVitales(initialSignos);
                if (!signosInitSuccess) {
                    toast.error('Error al inicializar los signos vitales');
                    return;
                }
                // Si la creación inicial de signos vitales fue exitosa, continuar con el flujo
                const success = await editarPacientesSA(selectedPerson._id, selectedSintomas, selectedAlergias);
                if (success) {
                    toast.success('Paciente editado con éxito');
                    setSelectedSintomas([]);
                    setSelectedAlergias([]);
                } else {
                    toast.error('Error al editar el paciente');
                    return;
                }

                const signos = {
                    temperatura: selectedTemperatura,
                    pulso: selectedPulso,
                    presionArterial: selectedPresion,
                    peso: selectedPeso,
                    estatura: selectedEstatura
                };

                const signosSuccess = await editarSignosVitales(selectedPerson._id, signos);
                if (signosSuccess) {
                    toast.success('Signos vitales registrados con éxito');
                    setSelectedTemperatura('');
                    setSelectedPulso('');
                    setSelectedPresion('');
                    setSelectedPeso('');
                    setSelectedEstatura('');
                } else {
                    toast.error('Error al registrar los signos vitales');
                    return;
                }

                const diagnosticoSuccess = await diagnostico(selectedPerson._id);
                if (diagnosticoSuccess) {
                    toast.success('Diagnóstico realizado con éxito');
                } else {
                    toast.error('Error al realizar el diagnóstico');
                }



            } catch (error) {
                console.error('Error al enviar los datos:', error);
                toast.error('Error al enviar los datos');
            }
        } else {
            console.error('No hay paciente seleccionado.');
            toast.error('No hay paciente seleccionado');
        }
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
                <Label className="block text-sm font-medium leading-6 text-gray-900">Elegir Paciente</Label>
                <div className="relative mt-2">
                    <ComboboxInput
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(person) => person?.nombres && person?.apellidos ? `${person.nombres} ${person.apellidos}` : ''}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </ComboboxButton>

                    {filteredPeople.length > 0 && (
                        <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredPeople.map((person) => (
                                <ComboboxOption
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
                                </ComboboxOption>
                            ))}
                        </ComboboxOptions>
                    )}
                </div>
            </Combobox>

            <div className="col-span-1 mt-4">
                <Listbox value={selectedSintomas} onChange={setSelectedSintomas} multiple>
                    {({ open }) => (
                        <>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                        {selectedSintomas.length > 0 ? selectedSintomas.join(', ') : 'Seleccionar síntomas'}
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
                                        {sintomas.map((sintoma, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={sintoma}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {sintoma}
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

            <div className="col-span-1 mt-4">
                <Listbox value={selectedAlergias} onChange={setSelectedAlergias} multiple>
                    {({ open }) => (
                        <>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                        {selectedAlergias.length > 0 ? selectedAlergias.join(', ') : 'Seleccionar alergias'}
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
                                        {alergias.map((alergia, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={alergia}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {alergia}
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

            <div className="col-span-1 mt-4">
                <Listbox value={selectedTemperatura} onChange={setSelectedTemperatura}>
                    {({ open }) => (
                        <>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                        {selectedTemperatura || 'Seleccionar temperatura'}
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
                                        {signosVitales.map((sintoma, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={sintoma}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {sintoma}
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

            <div className="col-span-1 mt-4">
                <Listbox value={selectedPulso} onChange={setSelectedPulso}>
                    {({ open }) => (
                        <>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                        {selectedPulso || 'Seleccionar pulso'}
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
                                        {signosVitales.map((sintoma, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={sintoma}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {sintoma}
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

            <div className="col-span-1 mt-4">
                <Listbox value={selectedPresion} onChange={setSelectedPresion}>
                    {({ open }) => (
                        <>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                        {selectedPresion || 'Seleccionar presión arterial'}
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
                                        {signosVitales.map((sintoma, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={sintoma}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {sintoma}
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

            <div className="col-span-1 mt-4">
                <Listbox value={selectedPeso} onChange={setSelectedPeso}>
                    {({ open }) => (
                        <>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                        {selectedPeso || 'Seleccionar peso'}
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
                                        {signosVitales.map((sintoma, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={sintoma}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {sintoma}
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

            <div className="col-span-1 mt-4">
                <Listbox value={selectedEstatura} onChange={setSelectedEstatura}>
                    {({ open }) => (
                        <>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <span className="block truncate">
                                        {selectedEstatura || 'Seleccionar estatura'}
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
                                        {signosVitales.map((sintoma, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={sintoma}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {sintoma}
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
                className="mt-6 inline-flex items-center px-4 py-2 mr-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Hacer Diagnóstico
            </button>

            
        </div>
    );
}
