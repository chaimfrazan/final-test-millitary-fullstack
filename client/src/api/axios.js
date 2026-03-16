import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/",
});

export const addRocket = (data) => api.post("/api/launchers", data);
export const allRocket = () => api.get("/api/launchers");
export const getRocket = (id) => api.get(`/api/launchers/${id}`);
export const deleteRocket = (id) => api.delete(`/api/launchers/${id}`);
