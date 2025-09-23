import { Usuario } from "./usuario";

export class Endereco {

    id!: number;

    logradouro!: string;

    numero!: number;    

    bairro!: string;

    cidade!: string;

    estado!: string;

    cep!: string;

    usuario!: Usuario;

    constructor(id:number, logradouro:string, numero:number, bairro:string, cidade:string, estado:string, cep:string, usuario:Usuario){
        this.id = id;
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade= cidade;
        this.estado = estado;
        this.cep = cep;
        this.usuario = usuario;
    }

}
