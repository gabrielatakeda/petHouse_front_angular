import { Endereco } from "./endereco";

export class Usuarios { //Define uma classe e ela é usada como molde para representar os dados de um usuário
    //Basicamente como se fossem os atributos do backend
    //O operador ! significa que as propriedades serão inicializadas em algum momento
    id?: number;
    nome!: string;
    email!: string;
    cpf!: string;
    senha!: string;
    user!: string;
    dataNascimento!: Date;
    enderecos?: Endereco[];


    constructor(nome: string, email: string, cpf: string, senha: string, user: string, dataNascimento: Date, enderecos: Endereco[], id?: number) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.user = user;
        this.dataNascimento = dataNascimento;
        this.enderecos = enderecos;
    }

}