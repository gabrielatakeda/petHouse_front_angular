import { Component } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landingPage',
  imports: [ RouterLink],
  templateUrl: './landing-page-produto.component.html',
  styleUrl: './landing-page-produto.component.scss'
})
export class LandingPageProdutoComponent {

  produtos: Produto[] = [];

  produto: Produto = {
      id: 0,
      nome: '',
      descricao: '',
      precoVenda: null,
      quantidade: null,
      categoria: {id: 0, nome: '', produtos: [], subcategorias: [] },
      urlFoto: ''
    };

    constructor(
        private produtoService: ProdutoService
      ) {}
    
      ngOnInit(): void {
        this.findAllProdutos();
      }
    
      findAllProdutos() {
    this.produtoService.findAll().subscribe({
      next: (res) => this.produtos = res,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  
}
