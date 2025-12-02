import { Component, inject } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../../../models/pedido';
import { Usuarios } from '../../../models/usuario';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { PedidoService } from '../../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto-details',
  standalone: true,
  imports: [],
  templateUrl: './produto-details.component.html',
  styleUrls: ['./produto-details.component.scss']
})
export class ProdutoDetailsComponent {

  authService = inject(AuthService);
  usuarioService = inject(UsuarioService);
  produtoService = inject(ProdutoService);
  pedidoService = inject(PedidoService);
  activedRoute = inject(ActivatedRoute);

  produto: Produto = new Produto("", "", 0, 0, "");
  usuario: Usuarios = new Usuarios("", "", "", "", "", new Date(), []);

  quantidade: number = 1;

  // Pedido inicializado já com array vazio
  pedido: Pedido = new Pedido(new Date(), 0, "PENDENTE", []);

  constructor(private router: Router) {
    // Carrega usuário logado
    this.authService.usuarioLogado$.subscribe(usuario => {
      if (usuario?.id) {
        this.usuarioService.findById(usuario.id).subscribe({
          next: result => {
            this.usuario = result;
          },
          error: () => {
            alert("Ocorreu um erro ao buscar o usuário");
          }
        });
      }
    });

    // Carrega produto
    const id = this.activedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.produtoService.findById(id).subscribe({
      next: produto => {
        this.produto = produto;
      },
      error: erro => {
        console.error(erro);
      }
    });
  }

  aumentarQuantidade() {
    this.quantidade++;
  }

  diminuirQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  adicionarCarrinho() {
    // 1. Verifica login
    if (!this.usuario?.id) {
      Swal.fire("Atenção", "Faça login para adicionar ao carrinho", "warning");
      this.router.navigate(['/login']);
      return;
    }

    // 2. Busca ou cria carrinho
    this.pedidoService.findByCliente(this.usuario.id).subscribe({
      next: pedidoEncontrado => {
        if (!pedidoEncontrado) {
          this.pedido.cliente = this.usuario;
          this.pedido.produtos = []; // inicializa
        } else {
          this.pedido = pedidoEncontrado;
          if (!this.pedido.produtos) {
            this.pedido.produtos = []; // garante inicialização
          }
        }

        // 3. Adiciona produto com a quantidade escolhida
        const produtoSelecionado = {
          ...this.produto,
          quantidadeSelecionada: this.quantidade
        };

        this.pedido.produtos.push(produtoSelecionado);

        // 4. Atualiza total corretamente
        this.pedido.total = (this.pedido.total ?? 0) + 
          ((this.produto.precoVenda ?? 0) * this.quantidade);

        // 5. Salva no banco
        this.pedidoService.save(this.pedido).subscribe({
          next: result => {
            console.log("Pedido salvo:", result);
            Swal.fire({
              title: "Sucesso!",
              text: "Produto adicionado ao carrinho.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/']);
            });
          },
          error: err => {
            Swal.fire("Erro", "Erro ao salvar pedido", "error");
            console.error(err);
          }
        });
      },
      error: err => {
        console.error("Erro ao buscar pedido do cliente:", err);
      }
    });
  }
}