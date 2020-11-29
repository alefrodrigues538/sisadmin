import axios from 'axios'

const api = axios.create({ 
    baseURL: "https://sisadmin.kinghost.net:21008/api",
});

export default api;