import axios from 'axios'

const api = axios.create({ 
    baseURL: "http://sisadmin.kinghost.net:21008/api",
});

export default api;