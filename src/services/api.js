import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('voltify_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('voltify_token');
      localStorage.removeItem('voltify_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

export const applianceAPI = {
  getAll: () => api.get('/appliances'),
  getById: (id) => api.get(`/appliances/${id}`),
  create: (data) => api.post('/appliances', data),
  update: (id, data) => api.put(`/appliances/${id}`, data),
  delete: (id) => api.delete(`/appliances/${id}`),
};

export const usageAPI = {
  getAll: (params) => api.get('/usage', { params }),
  calculate: (data) => api.post('/usage/calculate', data),
  getSummary: (days) => api.get('/usage/summary', { params: { days } }),
  delete: (id) => api.delete(`/usage/${id}`),
  deleteAll: () => api.delete('/usage'),
};

export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export default api;