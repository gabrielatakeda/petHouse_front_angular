import { Endereco } from "./endereco";
import { Pagamento } from "./pagamento";
import { Produto } from "./produto";
import { Usuarios } from "./usuario";

export class Pedido {

    id?: number;
    cliente!: Usuarios;
    dataPedido!: Date;
    total!: number;
    pagamento!: Pagamento;
    produtos!: Produto[];
    endereco!: Endereco;
    statusPedido!: string;

    constructor(cliente: Usuarios, dataPedido: Date, total: number, pagamento: Pagamento, produtos: Produto[], endereco: Endereco, statusPedido: string, id?: number){
        this.cliente = cliente;
        this.dataPedido = dataPedido;
        this.total = total;
        this.pagamento = pagamento;
        this.produtos = produtos;
        this.endereco = endereco;
        this.statusPedido = statusPedido;
        this.id = id;
    } 

}
