export const SERVER_BASE_URL = import.meta.env.VITE_APP_SERVER_BASE_URL;
export const SERVER_FETCH_URL = SERVER_BASE_URL + '/api/v1';


export const API_ROUTES = {
    createContract: SERVER_FETCH_URL + '/contract',
    getAllContracts: SERVER_FETCH_URL + '/contract/all',
    deleteContract: SERVER_FETCH_URL + '/contract',
    getContract: SERVER_FETCH_URL + '/contract',
    updateContract: SERVER_FETCH_URL + '/contract',
}