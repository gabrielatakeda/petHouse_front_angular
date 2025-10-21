import { Endereco } from "./endereco";

export class Usuario {
    id!: number;
    nome!: string;
    email!: string;
    senha!: string;
    user!: string;
    enderecos!: Endereco[];

    constructor(id: number, nome: string, email: string, senha: string, usuario: string, enderecos: Endereco[]) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.user = usuario;
        this.enderecos = enderecos;
    }
}
