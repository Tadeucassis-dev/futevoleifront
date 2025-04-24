export interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string; // Deve ser armazenado como +5511999999999 ou (99)9 9999-9999
  dataNascimento: string;
  diaVencimentoMensalidade?: number | null;
  ativo: boolean;
}
  
  export interface Checkin {
    id: number;
    idAluno: Aluno; // Relacionamento com Aluno
    dataHora: string; // Pode mudar para Date se preferir
  }
  
  export interface Pagamento {
    id: number;
    idAluno: Aluno; // Relacionamento com Aluno
    valor: number;
    dataPagamento: string; // Pode mudar para Date se preferir
    diaVencimentoMensalidade: number;
    pago: boolean;
  }

  export interface Payment {
    id: number;
    studentId: number;
    amount: number;
    status: string;
    qrCode: string;
    createdAt: string;
  }