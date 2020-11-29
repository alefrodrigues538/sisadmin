import axios from 'axios'

const api = axios.create({ 
    baseURL: "http://seuspedidosdelivery.com.br:21008/api",
});

export default api;