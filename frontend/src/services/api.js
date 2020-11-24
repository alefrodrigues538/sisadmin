import axios from 'axios'

const api = axios.create({ 
    baseURL: "https://localhost:3006/api",
});

export default api;