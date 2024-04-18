import React, { useEffect, useState } from 'react';
import { estudiantesGet, calificacionesPost } from '../controller/calificaciones.jsx'

export function StudentPage() {
    const [startDate1, setStartDate1] = useState('');
    const [endDate1, setEndDate1] = useState('');
    const [weight1, setWeight1] = useState(0);
    const [response, setResponse] = useState(null);


    const [startDate2, setStartDate2] = useState('');
    const [endDate2, setEndDate2] = useState('');
    const [weight2, setWeight2] = useState(0);




    const onSubmit = async () => {
        const respData = await calificacionesPost(startDate1, endDate1, parseFloat(weight1), startDate2, endDate2, parseFloat(weight2));
        setResponse(respData);
    };

    return (
        <div>
            <div className="space-y-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Progress 1:</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="start-date-1" className="block text-sm font-medium text-gray-700">Fecha de inicio:</label>
                        <input
                            type="date"
                            id="start-date-1"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={startDate1}
                            onChange={(e) => setStartDate1(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="end-date-1" className="block text-sm font-medium text-gray-700">Fecha de fin:</label>
                        <input
                            type="date"
                            id="end-date-1"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={endDate1}
                            onChange={(e) => setEndDate1(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="weight-1" className="block text-sm font-medium text-gray-700">Valor del progreso:</label>
                        <input
                            type="number"
                            id="weight-1"
                            step="0.01"
                            max="1"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={weight1}
                            onChange={(e) => setWeight1(e.target.value)}
                        />
                    </div>
                </div>

                <h3 className="text-lg leading-6 font-medium text-gray-900">Progreso 2:</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="start-date-2" className="block text-sm font-medium text-gray-700">Fecha de inicio:</label>
                        <input
                            type="date"
                            id="start-date-2"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={startDate2}
                            onChange={(e) => setStartDate2(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="end-date-2" className="block text-sm font-medium text-gray-700">Fecha de fin:</label>
                        <input
                            type="date"
                            id="end-date-2"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={endDate2}
                            onChange={(e) => setEndDate2(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="weight-2" className="block text-sm font-medium text-gray-700">Valor del progreso:</label>
                        <input
                            type="number"
                            id="weight-2"
                            step="0.01"
                            max="1"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={weight2}
                            onChange={(e) => setWeight2(e.target.value)}
                        />
                    </div>
                </div>

                <button onClick={onSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Calcular</button>
            </div>



        

            {response && (
                <div className="response-container">
                    <h2>Response Data:</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grade
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    P1
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    P2
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Needed
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(response).map(
                                ([studentID, student]) => (
                                    <tr key={studentID}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {studentID}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {student.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {student.grade}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {student.p1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {student.p2}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {student.needed}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default StudentPage;
