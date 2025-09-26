import axios from "axios";

const api = axios.create({
    baseURL: "http://10.101.21.123:5000"
});

export default api;
