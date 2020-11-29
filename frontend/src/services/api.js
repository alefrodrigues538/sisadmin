import axios from 'axios'

const api = axios.create({ 
    baseURL: "https://seuspedidosdelivery.com.br:21008/api",
});

export default api;