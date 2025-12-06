import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const apiGemini = axios.create({
  baseURL: process.env.REACT_APP_API_GEMINI_URL,
});

export const apiInfoSimples = axios.create({
  baseURL: process.env.REACT_APP_API_INFOSIMPLES_URL,
});

export const apiAuthEmail = axios.create({
  baseURL: process.env.REACT_APP_API_AUTHEMAIL_URL,
});

