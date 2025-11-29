import { Endereco } from "./endereco";

export class Usuarios {
  id?: number;
  nome!: string;
  email!: string;
  cpf!: string;
  senha!: string;
  user!: string;       
  enderecos?: Endereco[];

  constructor(
    nome: string,
    email: string,
    cpf: string,
    senha: string,
    user: string,       
    enderecos: Endereco[] = [],
    id?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.senha = senha;
    this.user = user;  
    this.enderecos = enderecos;
  }
}