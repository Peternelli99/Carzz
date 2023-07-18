export interface IRetornoApi {
    erro: boolean;
    mensagem: string;
    totalDeRegistros: number;
    unico?: any,
    lista?: any,
  }
  
  export interface IRetornoApiLogin {
    erro: boolean;
    mensagem: string;
    unico?: any,
  }

export interface ICliente {
    nome: string,
    email: string;
    cpf: number;
    marca: string;
}

export interface IMarca {
    nome: string,
    concessionaria: string;
}

export interface IConcessionaria {
    nome: string,
    sigla: string;
}

export interface ICarro {
    nome: string,
    codigo: string;
    concessionaria: number;
    vendedor: string;
}

export interface IVendedor {
    nome: string,
    dataNasc: string;
    concessionaria: number;
    salario: string;
}