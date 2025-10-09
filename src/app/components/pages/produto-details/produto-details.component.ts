import { Component, inject } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-details',
  imports: [],
  templateUrl: './produto-details.component.html',
  styleUrl: './produto-details.component.scss'
})
export class ProdutoDetailsComponent {

  produto: Produto = new Produto();
  produtoService = inject(ProdutoService);

  activedRoute = inject(ActivatedRoute);

   constructor() {
    let id = this.activedRoute.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

   findById(id: number) {
    this.produtoService.findById(1).subscribe({
      next: produto => {
        this.produto = produto;
      },
      error: erro => {
        console.error(erro);
      }
    });
   }
} 
