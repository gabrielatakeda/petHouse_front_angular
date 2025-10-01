import { Usuarios } from "./usuarios";

export class Endereco {

    id?: number;
    logradouro!: string;
    numero!: number;    
    bairro!: string;
    cidade!: string;
    estado!: string;
    cep!: string;
    usuario?: Usuarios;

    constructor(
        logradouro: string = "",
        numero: number = 0,
        bairro: string = "",
        cidade: string = "",
        estado: string = "",
        cep: string = "",
        usuario?: Usuarios,
        id?: number
    ) {
        this.id = id;
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.usuario = usuario;
    }
}
