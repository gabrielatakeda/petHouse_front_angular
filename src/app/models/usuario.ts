import { Endereco } from "./endereco";

export class Usuarios { 
  nome!: string; 
  email!: string;
  cpf!: string;
  senha!: string;
  user!: string;
  dataNascimento!: Date;
  enderecos?: Endereco[];
  
      constructor(nome: string, email: string, senha: string, user: string, dataNascimento: Date, enderecos: Endereco[]) {
          this.nome = nome;
          this.email = email;
          this.senha = senha;
          this.user = user;
          this.dataNascimento = dataNascimento;
          this.enderecos = enderecos;
      }

}