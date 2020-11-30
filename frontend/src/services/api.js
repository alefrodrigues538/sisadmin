import axios from 'axios'

const api = axios.create({ 
    baseURL: "https://seuspedidosdelivery.com.br:443/api",
});

export default api;