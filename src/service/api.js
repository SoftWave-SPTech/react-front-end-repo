import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://44.215.111.241:8080',
});

export const apiGemini = axios.create({
    baseURL: 'http://44.215.111.241:8082',
});

export const apiInfoSimples = axios.create({
    baseURL: 'http://44.215.111.241:8084',
});

export const apiAuthEmail = axios.create({
    baseURL: 'http://44.215.111.241:8080',
});
