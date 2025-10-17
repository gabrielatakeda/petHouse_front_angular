import { Produto } from "./produto";

export class Categoria {
    id?: number;
    nome!: string;
    produtos?: Produto[];
    subcategorias?: Categoria[];
    categoriaPai?: { id: number } | null;
}
