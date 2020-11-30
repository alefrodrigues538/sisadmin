import axios from 'axios'

const api = axios.create({ 
    baseURL: "http://localhost:443/api",
    // baseURL: "https://seuspedidosdelivery.com.br:443/api",
});

export default api;