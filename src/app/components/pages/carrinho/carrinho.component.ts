import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../services/pedido.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  pedidoService = inject(PedidoService);
  authService = inject(AuthService);

  cartItems: any[] = [];
  pagamentoSelecionado: string = '';
  total: number = 0;
  pedido: any; // guarda o pedido carregado

  ngOnInit(): void {
    this.authService.usuarioLogado$.subscribe(usuario => {
      if (usuario?.id) {
        this.pedidoService.findByCliente(usuario.id).subscribe({
          next: pedido => {
            if (pedido) {
              this.pedido = pedido;
              this.cartItems = pedido.produtos;
              this.atualizarTotal();
            }
          },
          error: err => console.error("Erro ao carregar carrinho", err)
        });
      }
    });
  }

  // calcula subtotal de cada item
  getSubtotal(item: any): number {
    const qtd = item.quantidadeSelecionada ?? 1;
    return (item.precoVenda ?? 0) * qtd;
  }

  // recalcula o total do carrinho
  atualizarTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => {
      const qtd = item.quantidadeSelecionada ?? 1;
      return acc + (item.precoVenda ?? 0) * qtd;
    }, 0);
  }

  // remove um item do carrinho e salva no backend
  removerItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.atualizarTotal();

    if (this.pedido) {
      this.pedido.produtos = this.cartItems;
      this.pedido.total = this.total;

      this.pedidoService.save(this.pedido).subscribe({
        next: () => console.log("Pedido atualizado após remoção"),
        error: err => console.error("Erro ao atualizar pedido", err)
      });
    }
  }

  // limpa toda a sacola e salva no backend
  limparSacola(): void {
    this.cartItems = [];
    this.total = 0;

    if (this.pedido) {
      this.pedido.produtos = [];
      this.pedido.total = 0;

      this.pedidoService.save(this.pedido).subscribe({
        next: () => console.log("Sacola limpa e pedido atualizado"),
        error: err => console.error("Erro ao limpar sacola", err)
      });
    }
  }
}