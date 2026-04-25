import axios from 'axios';

export const api = axios.create({
    baseUrl: import.meta.env.VITE_API_URL,
    // baseURL: 'http://localhost:3000',
});