import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../../../services/categoria.service';
import { ProdutoService } from '../../../../services/produto.service';
import { PedidoService } from '../../../../services/pedido.service';
import { AuthService } from '../../../../services/auth.service';
import { Categoria } from '../../../../models/categoria';
import { Produto } from '../../../../models/produto';
import { Usuarios } from '../../../../models/usuario';
import { switchMap, of } from 'rxjs';
import { NavbarComponent } from '../../../design/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './categoria-produtos.component.html',
  styleUrls: ['./categoria-produtos.component.scss']
})
export class CategoriaProdutosComponent implements OnInit {

  categoriaPai!: Categoria;
  produtos: Produto[] = [];
  loading = true;
  error = false;

  usuarioLogado: Usuarios | undefined = undefined;
  pedidoPendente: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Captura usuário logado
    this.authService.usuarioLogado$.subscribe(usuario => {
      this.usuarioLogado = usuario;
    });

    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.carregarProdutosDaCategoriaPai(slug);
      }
    });
  }

  carregarProdutosDaCategoriaPai(slug: string) {
    this.loading = true;
    this.error = false;

    this.categoriaService.findAll().pipe(
      switchMap((todasCategorias: Categoria[]) => {
        const pai = todasCategorias.find(c =>
          c.slug === slug && (!c.categoriaPai || c.categoriaPai === null)
        );

        if (!pai || !pai.id) {
          this.error = true;
          this.loading = false;
          return of([]);
        }

        this.categoriaPai = pai;
        const idsPermitidos = this.coletarTodosIds(pai, todasCategorias);
        return this.produtoService.findAll();
      })
    ).subscribe({
      next: (todosProdutos) => {
        if (!this.categoriaPai) {
          this.error = true;
          this.loading = false;
          return;
        }

        const idsPermitidos = this.coletarTodosIds(this.categoriaPai, []);
        this.produtos = todosProdutos.filter(p =>
          p.categoria?.id && idsPermitidos.includes(p.categoria.id)
        );
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private coletarTodosIds(categoria: Categoria, todas: Categoria[] = []): number[] {
    const ids: number[] = categoria.id ? [categoria.id] : [];

    if (categoria.subcategorias && categoria.subcategorias.length > 0) {
      for (const sub of categoria.subcategorias) {
        if (sub.id) {
          ids.push(sub.id);
          const subCompleta = todas.find(t => t.id === sub.id);
          if (subCompleta) {
            ids.push(...this.coletarTodosIds(subCompleta, todas));
          }
        }
      }
    }
    return ids;
  }

  irParaProduto(id?: number) {
    if (id) {
      this.router.navigate(['/produto', id]);
    }
  }

  adicionarAoCarrinho(produto: Produto) {
  if (!this.usuarioLogado?.id) {
    Swal.fire('Atenção', 'Faça login para adicionar ao carrinho', 'warning')
      .then(() => this.router.navigate(['/login']));
    return;
  }

  this.pedidoService.findByCliente(this.usuarioLogado.id).subscribe({
    next: (pedidoExistente) => {
      let pedidoParaSalvar = pedidoExistente;

      if (!pedidoParaSalvar) {
        pedidoParaSalvar = {
          cliente: this.usuarioLogado,   // ← objeto completo do usuário
          dataPedido: new Date(),
          total: 0,
          statusPedido: 'PENDENTE',
          produtos: []
        };
      }

      // adiciona o produto
      pedidoParaSalvar.produtos.push(produto);
      pedidoParaSalvar.total += produto.precoVenda ?? 0;

      // SALVA (aqui estava o erro: você estava usando pedidoPendente)
      this.pedidoService.save(pedidoParaSalvar).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Adicionado!',
            text: `${produto.nome} foi para o carrinho`,
            timer: 1800,
            showConfirmButton: false
          });
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Erro', 'Não foi possível adicionar ao carrinho', 'error');
        }
      });
    },
    error: () => {
      Swal.fire('Erro', 'Erro ao buscar o carrinho', 'error');
    }
  });
}
}