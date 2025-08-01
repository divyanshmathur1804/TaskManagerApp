// src/api/index.ts or wherever you're creating axios instance
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080', // fallback for local dev
});

export default api;
