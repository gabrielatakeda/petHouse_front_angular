import { Pedido } from "./pedido";

export class Pagamento {

    id?: number;
    pedido!: Pedido;
    metodoPagamento!: string;
    statusPagamento!: string;
    dataPagamento!: Date;

    constructor(pedido: Pedido, metodoPagamento: string, statusPagamento: string, dataPagamento: Date, id?: number){
        this.id = id;
        this.pedido = pedido;
        this.metodoPagamento = metodoPagamento;
        this.statusPagamento = statusPagamento;
        this.dataPagamento = dataPagamento;
    }

}
