import React, { useState, useEffect } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ObterPacientes_idDocotor } from '../../controller/Paciente_ControllerAdmin'
import './css/style.css';
import { useAuth } from '../../controller/AuthContext.jsx';


export function DiagnosticoPaciente() {


    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)
    const [pacientes, setPacientes] = useState([]);
    const { user, isAuthenticated } = useAuth();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

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

    const filteredPeople =
        query === ''
            ? pacientes
            : pacientes.filter((person) => {
                return person.nombres.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className=" filterPading min-h-screen bg-gray-100">
            <Combobox
            as="div"
            value={selectedPerson}
            onChange={(person) => {
                setQuery('')
                setSelectedPerson(person)
            }}
        >
            <Label className="block text-sm font-medium leading-6 text-gray-900">Elegir Paciente</Label>
            <div className="relative mt-2">
                <ComboboxInput
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery('')}
                    displayValue={(person) => person?.nombres && person?.apellidos ? `${person.nombres} ${person.apellidos}` : ''}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>

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

        </div>
        
    )
}






