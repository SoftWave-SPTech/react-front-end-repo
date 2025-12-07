import axios from 'axios';
import { getAuthToken } from '../Utils/auth';

// const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL)
//   ? import.meta.env.VITE_API_URL
//   : 'http://localhost:8080';

// const GEMINI_API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_URL)
//   ? import.meta.env.VITE_GEMINI_API_URL
//   : 'http://localhost:8082';

// const INFO_SIMPLES_API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_INFO_SIMPLES_API_URL)
//   ? import.meta.env.VITE_INFO_SIMPLES_API_URL
//   : 'http://localhost:8084';

// const AUTH_EMAIL_API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_AUTH_EMAIL_API_URL)
//   ? import.meta.env.VITE_AUTH_EMAIL_API_URL
//   : 'http://localhost:8083';

export const api = axios.create({
  baseURL: 'http://$EC2_HOST_PUBLIC:8080',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiGemini = axios.create({
  baseURL: 'http://$EC2_HOST_PUBLIC:8082',
  withCredentials: true,
  
});

export const apiInfoSimples = axios.create({
  baseURL: 'http://$EC2_HOST_PUBLIC:8084',
  withCredentials: true,
});

export const apiAuthEmail = axios.create({
  baseURL: 'http://$EC2_HOST_PUBLIC:8083',
  withCredentials: true,
});



