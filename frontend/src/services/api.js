import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3003/api",
    // baseURL: "https://seuspedidosdelivery.com.br:3003/api",
});

export default api;