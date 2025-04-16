export interface Aluno {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string; // Pode mudar para Date se preferir
    diaVencimentoMensalidade: number;
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