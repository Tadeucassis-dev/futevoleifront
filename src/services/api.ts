import axios from 'axios';
import { Aluno, Checkin } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base do seu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAlunos = () => api.get<Aluno[]>('/alunos');
export const createAluno = (aluno: Aluno) => api.post<Aluno>('/alunos', aluno);
export const deleteAluno = (id: number) => api.delete(`/alunos/${id}`);

export const getCheckinsByAluno = (idAluno: number) => api.get<Checkin[]>(`/checkins/${idAluno}`);
export const createCheckin = (checkin: Partial<Checkin>) => api.post<Checkin>('/checkins', checkin);

// Adicione métodos para Pagamento se necessário
export default api;