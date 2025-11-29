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
  imports: [],
  templateUrl: './produto-details.component.html',
  styleUrl: './produto-details.component.scss'
})
export class ProdutoDetailsComponent {

  authService = inject(AuthService);
  usuarioService = inject(UsuarioService);

  produto: Produto = new Produto("", "", 0, 0, "",);
  produtoService = inject(ProdutoService);
  pedidoService = inject(PedidoService)

  activedRoute = inject(ActivatedRoute);

  usuario: Usuarios = new Usuarios("","","","","",[])

  constructor(private router : Router) {
    
    this.authService.usuarioLogado$.subscribe(usuario => {
      this.usuarioService.findById(usuario.id).subscribe({
        next: result => {
          this.usuario = result;
        },
        error: () => {
          alert("Ocorreu um erro ao buscar o usuário");
        }
      });
    });

    let id = this.activedRoute.snapshot.params['id'];
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

  quantidade: number = 1;

  aumentarQuantidade() {
    this.quantidade++;
  }

  diminuirQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  pedido: Pedido = new Pedido(new Date,0,"PENDENTE",[]) 

  adicionarCarrinho() {
  if (!this.usuario?.id) {
    this.router.navigate(['/login'])
  }

  this.pedidoService.findByCliente(this.usuario.id).subscribe({
    next: pedido => {
      if (!pedido) {
        this.pedido.cliente = this.usuario;
      } else {
        this.pedido = pedido;
      }

      this.pedido.produtos.push(this.produto);
      this.pedido.total += (this.produto.precoVenda ?? 0)*this.quantidade;

      this.pedidoService.save(this.pedido).subscribe({
        next: result => {
          Swal.fire("sucesso","pedido salvo com sucesso!", "success")
          console.log(result)
        },
        error: err => {
          Swal.fire("erro", "Erro ao salvar pedido", "error")
          console.log(err)
          console.log(pedido, this.pedido);
        }
      });
    },
    error: err => {
      console.error("Erro ao buscar pedido do cliente:", err);
    }
  });
}

} 
