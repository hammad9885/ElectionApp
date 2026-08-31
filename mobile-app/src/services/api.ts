import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api'; // for Android emulator
// For real device, use your computer's LAN IP like: 'http://192.168.x.x:8000/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const signup = (data) => api.post('/register', { ...data, password_confirmation: data.password });
export const login = (data) => api.post('/login', data);
export const logout = (token) => api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });

export default api;
