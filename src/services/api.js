import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://empresas.ioasys.com.br/api/v1'
});


export default api;