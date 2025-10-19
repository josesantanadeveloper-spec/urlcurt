import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:4000",//'https://urlcurt.site', 
  withCredentials: true
});

export default api;
