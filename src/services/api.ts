import axios from 'axios';
import { Checkin, Aluno } from '../types';

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

// Métodos de alunos
export const getAlunos = async (): Promise<Aluno[]> => {
  const response = await api.get('/alunos');
  return response.data;
};

export const createAluno = async (data: { nome: string; email: string; ativo: boolean; telefone?: string; dataNascimento?: string; diaVencimentoMensalidade?: number }) =>
  api.post<Aluno>('/alunos', data);

export const updateAluno = async (id: number, data: { nome: string; email: string; ativo: boolean; telefone?: string; dataNascimento?: string; diaVencimentoMensalidade?: number }) =>
  api.put<Aluno>(`/alunos/${id}`, data);

export const deleteAluno = async (id: number) => api.delete(`/alunos/${id}`);

// Método de notificações
export const sendManualNotification = async (idAluno: number, mensagem: string): Promise<string> =>
  api.post(`/notificacoes/${idAluno}`, { mensagem });

// Métodos de check-ins
export const getCheckinsByAluno = async (idAluno: number) => api.get<Checkin[]>(`/checkins/${idAluno}`);
export const createCheckin = async (checkin: Partial<Checkin>) => api.post<Checkin>('/checkins', checkin);

export default api;