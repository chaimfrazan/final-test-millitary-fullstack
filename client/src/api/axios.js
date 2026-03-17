import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const addRocket = (data) => api.post("/api/launchers", data);
export const allRocket = () => api.get("/api/launchers");
export const getRocket = (id) => api.get(`/api/launchers/${id}`);
export const deleteRocket = (id) => api.delete(`/api/launchers/${id}`);

export const createUser = (data) => api.post('/api/auth/register/create', data)
export const updateUser = (data) => api.put("api/auth/register/update", data)
export const deleteUser = (id) => api.delete(`/api/auth/register/delete/${id}`)
export const login = (data) => api.post('/api/auth/login', data)
export const getUser = (id) => api.get(`/api/auth/getUser/${id}`)
export const allUsers = ()=> api.get('/api/auth/allUsers')