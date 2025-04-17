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

export const createAluno = async (aluno: {
  nome: string;
  email: string;
  ativo: boolean;
  telefone?: string;
  dataNascimento?: string;
  diaVencimentoMensalidade?: number | null; // Permite null
}) => {
  const response = await api.post('/alunos', aluno);
  return response.data;
};

export const updateAluno = async (
  id: number,
  aluno: {
    nome: string;
    email: string;
    ativo: boolean;
    telefone?: string;
    dataNascimento?: string;
    diaVencimentoMensalidade?: number | null; // Permite null
  }
) => {
  const response = await api.put(`/alunos/${id}`, aluno);
  return response.data;
};

export const deleteAluno = async (id: number) => api.delete(`/alunos/${id}`);

// Método de notificações
export const sendManualNotification = async (alunoId: number, mensagem: string) => {
  const response = await api.post(`/notificacoes/${alunoId}`, { mensagem });
  console.log('Resposta de sendManualNotification:', response);
  return response.data;
};

// Métodos de check-ins
export const getCheckinsByAluno = async (idAluno: number) => api.get<Checkin[]>(`/checkins/${idAluno}`);
export const createCheckin = async (checkin: Partial<Checkin>) => api.post<Checkin>('/checkins', checkin);

export default api;