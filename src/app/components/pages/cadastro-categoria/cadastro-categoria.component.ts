import { Component } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-cadastro-categoria',
  imports: [],
  templateUrl: './cadastro-categoria.component.html',
  styleUrl: './cadastro-categoria.component.scss'
})
export class CadastroCategoriaComponent {

  categoriasPai: Categoria[] = [];
  subcategorias: Categoria[] = [];
  categoriaSelecionadaId: number | null = null;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.findCategoriasPai(); // carrega as categorias principais ao abrir
  }

  findCategoriasPai() {
    this.categoriaService.findCategoriasPai().subscribe({
      next: (res) => {
        this.categoriasPai = res;
        console.log('Categorias pai carregadas:', res);
      },
      error: (err) => console.error('Erro ao carregar categorias pai', err)
    });
  }

  findSubcategorias(id: number) {
    this.categoriaSelecionadaId = id;
    this.categoriaService.findSubcategorias(id).subscribe({
      next: (res) => {
        this.subcategorias = res;
        console.log('Subcategorias carregadas:', res);
      },
      error: (err) => console.error('Erro ao carregar subcategorias', err)
    });
  }
}