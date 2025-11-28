import axios from 'axios';

// URLs usando variáveis de ambiente (Vite usa import.meta.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_GEMINI_URL = import.meta.env.VITE_API_GEMINI_URL || 'http://localhost:8082';
const API_CONSULTAS_URL = import.meta.env.VITE_API_CONSULTAS_URL || 'http://localhost:8084';
const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL || 'http://localhost:8083';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const apiGemini = axios.create({
    baseURL: API_GEMINI_URL,
});

export const apiInfoSimples = axios.create({
    baseURL: API_CONSULTAS_URL,
});

export const apiAuthEmail = axios.create({
    baseURL: API_AUTH_URL,
});

// Interceptador para capturar erros 401 e redirecionar para login
const setupInterceptors = (apiInstance) => {
    apiInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Token inválido ou expirado
                sessionStorage.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );
};

// Aplicar interceptadores nas APIs que usam autenticação
setupInterceptors(api);
setupInterceptors(apiGemini);
setupInterceptors(apiInfoSimples);