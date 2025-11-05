import { Produto } from "./produto";

export class Categoria {
    id?: number;
    nome!: string;
    produtos?: Produto[];
    slug?: string;
    subcategorias?: Categoria[];
    categoriaPai?: { id: number } | null;

    constructor(nome: string, id?: number, produtos?: Produto[], slug?: string, subCategoria?: Categoria[], categoriaPai?: {id:number}) {
        this.id=id;
        this.nome=nome;
        this.produtos=produtos
        this.slug=slug;
        this.subcategorias=subCategoria;
        this.categoriaPai=categoriaPai;    
    }

}
