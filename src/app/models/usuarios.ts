import { Endereco } from "./endereco";

export class Usuarios { //Define uma classe e ela é usada como molde para representar os dados de um usuário
  //Basicamente como se fossem os atributos do backend
  //O operador ! significa que as propriedades serão inicializadas em algum momento
  id!: number;
  nome!: string; 
  email!: string;
  senha!: string;
  user!: string;
  enderecos!: Endereco[];
  
      constructor(id: number, nome: string, email: string, senha: string, user: string, enderecos: Endereco[]) {
          this.id = id;
          this.nome = nome;
          this.email = email;
          this.senha = senha;
          this.user = user;
          this.enderecos = enderecos;
      }

}