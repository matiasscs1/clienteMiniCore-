import axios from 'axios';

const API = 'http://localhost:3000';




export const calificacionesPost = async (startDate1, endDate1, weight1, startDate2, endDate2, weight2) => {
    try {
 
        const body =
        {
            "periods": [
                { "dateA": startDate1, "dateB": endDate1, "weight": weight1 },
                { "dateA": startDate2, "dateB": endDate2, "weight": weight2 }
            ]
        };
        const response = await axios.post(`${API}/compute`, body);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const estudiantesGet = async (student) => {
    try {
        const response = await axios.get(`${API}/students`, student);
        const mappedResponse = response.data.map((student) => ({
            id: student.id,
            name: student.name,
            grade: student.grade,
            needed: student.needed
        }));

        return mappedResponse;

    } catch (error) {
        throw new Error(error.response.data.error);
    }
}
