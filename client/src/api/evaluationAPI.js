import API from "./axios";


export const getATSReports = async () => {

    const response = await API.get(
        "/evaluate/reports"
    );


    return response.data;

};