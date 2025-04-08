import axios from 'axios';
import { Aluno, Checkin } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Métodos de autenticação
export const login = (credentials: { email: string; password: string }) =>
  api.post<{ token: string }>('/login', credentials);

// Métodos existentes
export const getAlunos = () => api.get<Aluno[]>('/alunos');
export const createAluno = (aluno: Aluno) => api.post<Aluno>('/alunos', aluno);
export const deleteAluno = (id: number) => api.delete(`/alunos/${id}`);

export const getCheckinsByAluno = (idAluno: number) => api.get<Checkin[]>(`/checkins/${idAluno}`);
export const createCheckin = (checkin: Partial<Checkin>) => api.post<Checkin>('/checkins', checkin);

export default api;