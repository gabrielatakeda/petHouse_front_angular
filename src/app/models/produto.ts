import { UrlTree } from "@angular/router";
import { Categoria } from "./categoria";

export class Produto {
    id?: number;
    nome!: string;
    descricao!: string;
    precoVenda: number | null = null;  // pode ser número ou null 
    quantidade: number | null = null;  // pode sser número ou null
    urlFoto!: string;
    categoria?: Categoria | null = null;

    constructor(nome: string, descricao: string, precoVenda: number, quantidade: number, urlFoto: string, categoria: Categoria, id?: number) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.precoVenda = precoVenda;
        this.quantidade = quantidade;
        this.urlFoto = urlFoto;
        this.categoria = categoria ?? null;
    }

}
