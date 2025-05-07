import axios from "axios";
import { Checkin, Aluno } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para lidar com respostas de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na resposta da API:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    if (error.response?.status === 401 || error.response?.status === 403) {
      return Promise.reject(
        new Error("Acesso negado: Verifique suas credenciais ou permissões")
      );
    }
    if (
      !error.response?.headers["content-type"]?.includes("application/json")
    ) {
      return Promise.reject(
        new Error(
          `Resposta inválida do servidor: ${
            error.response?.data || "Conteúdo não-JSON"
          }`
        )
      );
    }
    return Promise.reject(error);
  }
);

// Métodos de autenticação
export const login = (credentials: { email: string; password: string }) =>
  api.post<{ token: string }>("/login", credentials);

export const register = (user: {
  name: string;
  email: string;
  password: string;
}) => api.post<{ id: number; name: string; email: string }>("/register", user);

// Métodos de alunos
export const getAlunos = async (): Promise<Aluno[]> => {
  const response = await api.get("/alunos");
  return response.data;
};

export const createAluno = async (aluno: {
  nome: string;
  email: string;
  ativo: boolean;
  telefone?: string;
  dataNascimento?: string;
  diaVencimentoMensalidade?: number | null;
}) => {
  const response = await api.post("/alunos", aluno);
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
    diaVencimentoMensalidade?: number | null;
  }
) => {
  const response = await api.put(`/alunos/${id}`, aluno);
  return response.data;
};

export const deleteAluno = async (id: number) => api.delete(`/alunos/${id}`);

// Métodos de notificações
export const sendManualNotification = async (
  alunoId: number,
  mensagem: string
): Promise<string> => {
  const response = await api.post(`/notificacoes/${alunoId}`, { mensagem });
  return response.data;
};

export const sendNotificationToAll = async (
  mensagem: string
): Promise<string> => {
  try {
    const response = await api.post("/notificacoes/todos", { mensagem });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao enviar notificação em massa:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        `Erro ao enviar notificação em massa (status: ${
          error.response?.status || "desconhecido"
        })`
    );
  }
};

// Métodos de check-ins
export const getCheckinsByAluno = async (idAluno: number) =>
  api.get<Checkin[]>(`/checkins/${idAluno}`);
export const createCheckin = async (checkin: Partial<Checkin>) =>
  api.post<Checkin>("/checkins", checkin);

export interface Foto {
  id: number;
  url: string;
  descricao?: string;
}

// Listar fotos
export const getFotos = async (): Promise<Foto[]> => {
  const response = await api.get("/fotos");
  return response.data;
};

// Enviar foto
export const uploadFoto = async (formData: FormData) => {
  const response = await api.post("/fotos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Excluir foto
export const deleteFoto = async (id: number) => {
  await api.delete(`/fotos/${id}`);
};

export default api;
