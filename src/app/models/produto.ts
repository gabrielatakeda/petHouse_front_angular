import { Categoria } from "./categoria";

export class Produto {
    nome!: string;
    descricao!: string;
    precoVenda: number | null = null;  // pode ser número ou null // pode ser número ou null
    quantidade: number | null = null;  // pode ser número ou null
    urlFoto!: string;
    categoria:  Categoria | null = null;
}
