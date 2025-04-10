import axios from 'axios';
import {  Checkin } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Métodos de autenticação
export const login = (credentials: { email: string; password: string }) =>
  api.post<{ token: string }>('/login', credentials);

export const register = (user: { name: string; email: string; password: string }) =>
  api.post<{ id: number; name: string; email: string }>('/register', user);

// Métodos existentes
export const getAlunos = () => api.get('/alunos');
export const createAluno = (data: { nome: string; email: string; ativo: boolean }) =>
  api.post('/alunos', data);export const deleteAluno = (id: number) => api.delete(`/alunos/${id}`);

export const updateAluno = (id: number, data: { nome: string; email: string; ativo: boolean }) =>
  api.put(`/alunos/${id}`, data);

export const getCheckinsByAluno = (idAluno: number) => api.get<Checkin[]>(`/checkins/${idAluno}`);
export const createCheckin = (checkin: Partial<Checkin>) => api.post<Checkin>('/checkins', checkin);

export default api;