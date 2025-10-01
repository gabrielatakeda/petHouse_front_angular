import { Endereco } from "./endereco";

export class Usuarios {  
  id!: number;
  nome!: string; 
  email!: string;
  senha!: string;
  user!: string;
  enderecos!: Endereco[];
  
  constructor(
    id: number,
    nome: string,
    email: string,
    senha: string,
    user: string,
    enderecos: Endereco[]
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.user = user;
    this.enderecos = enderecos;
  }
}