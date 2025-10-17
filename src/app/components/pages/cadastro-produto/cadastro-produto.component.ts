import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos

@Component({
  selector: 'app-cadastro-produto',
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {
produto: Produto = {
    nome: '',
    descricao: '',
    precoVenda: null,
    quantidade: null,
    categoria: {id: 0, nome: '', produtos: [], subcategorias: [] },
    urlFoto: ''
  };

  produtos: Produto[] = [];
  categorias: Categoria[] = [];

  categoriaSelecionadaId: number | null = null;
  subcategoriasFiltradas: Categoria[] = [];
  selectedFile?: File;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.findCategoriasPai();
    this.findAllProdutos();
  }

  onCategoriaChange() {
    if (this.categoriaSelecionadaId) {
      this.categoriaService.findSubcategorias(this.categoriaSelecionadaId).subscribe({
        next: (res) => {
          this.subcategoriasFiltradas = res;
          this.produto.categoria = { id: 0,nome: '', produtos: [], subcategorias: [] };
        },
        error: (err) => console.error('Erro ao carregar subcategorias', err)
      });
    } else {
      this.subcategoriasFiltradas = [];
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.produtoService.save(this.produto, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          title: 'Produto cadastrado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.findAllProdutos();
      },
      error: () => {
        Swal.fire({
          title: 'Não foi possível cadastrar o produto. Tente novamente.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  findCategoriasPai() {
    this.categoriaService.findCategoriasPai().subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('Erro ao carregar categorias pai', err)
    });
  }

  findAllProdutos() {
    this.produtoService.findAll().subscribe({
      next: (res) => this.produtos = res,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

}