import axios from 'axios'

const api = axios.create({ 
    baseURL: "http://seuspedidosdelivery.com.br/api",
});

export default api;