import axios from 'axios';

// Kết nối tập trung tới API Gateway
export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Tự động đính kèm JWT Token vào Header của mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});