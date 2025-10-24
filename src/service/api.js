import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const apiGemini = axios.create({
    baseURL: 'http://localhost:8082',
});

export const apiInfoSimples = axios.create({
    baseURL: 'http://localhost:8084',
});

export const apiAuthEmail = axios.create({
    baseURL: 'http://localhost:8083',
});