import axios from 'axios'

const api = axios.create({ 
    baseURL: "https://seuspedidosdelivery.com.br/api",
});

export default api;