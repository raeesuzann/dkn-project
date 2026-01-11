import axios from 'axios';

// Base URL of your backend (Render, for example)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // optional
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: attach token from localStorage/sessionStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
