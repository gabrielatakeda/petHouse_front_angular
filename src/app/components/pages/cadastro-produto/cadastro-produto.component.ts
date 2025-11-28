import { Component } from '@angular/core';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { Categoria } from '../../../models/categoria';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent {

  produto: Produto = new Produto('', '', 0, 0, '', undefined);
  produtos: Produto[] = [];
  selectedFile?: File;

  // Controle dos selects
  categoriaSelecionadaId: number | null = null;
  subcategoriaSelecionadaId: number | null = null;
  subcategoriasFiltradas: any[] = [];

  // Categorias fixas com subcategorias
  categoriasFixas = [
    { id: 1, nome: 'Alimentação', subcategorias: [{ id: 11, nome: 'Ração Seca' }, { id: 12, nome: 'Ração Úmida' }, { id: 13, nome: 'Petiscos' }, { id: 14, nome: 'Suplementos' }] },
    { id: 2, nome: 'Higiene e Cuidados', subcategorias: [{ id: 21, nome: 'Shampoos' }, { id: 22, nome: 'Condicionadores' }, { id: 23, nome: 'Perfumes' }, { id: 24, nome: 'Escovas' }, { id: 25, nome: 'Tapetes Higiênicos' }] },
    { id: 3, nome: 'Acessórios', subcategorias: [{ id: 31, nome: 'Roupinhas' }, { id: 32, nome: 'Guias' }, { id: 33, nome: 'Coleiras' }, { id: 34, nome: 'Camas' }, { id: 35, nome: 'Comedouros' }, { id: 36, nome: 'Bebedouros' }] },
    { id: 4, nome: 'Brinquedos', subcategorias: [{ id: 41, nome: 'Bolinhas' }, { id: 42, nome: 'Pelúcias' }, { id: 43, nome: 'Mordedores' }, { id: 44, nome: 'Arranhadores' }, { id: 45, nome: 'Interativos' }] },
    { id: 5, nome: 'Saúde e Bem-Estar', subcategorias: [{ id: 51, nome: 'Antipulgas' }, { id: 52, nome: 'Vermífugos' }, { id: 53, nome: 'Vitaminas' }, { id: 54, nome: 'Medicamentos' }] }
  ];

  modoEdicao = false;
  produtoEditandoId: number | null = null;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.findAllProdutos();
  }

  // Quando muda a categoria pai
  onCategoriaChange() {
    this.subcategoriaSelecionadaId = null;
    this.subcategoriasFiltradas = [];

    if (this.categoriaSelecionadaId) {
      const cat = this.categoriasFixas.find(c => c.id === this.categoriaSelecionadaId);
      if (cat) {
        this.subcategoriasFiltradas = cat.subcategorias;
        // Se não escolher subcategoria, salva como categoria pai
        this.atualizarCategoriaNoProduto();
      }
    } else {
      this.produto.categoria = null;
    }
  }

  // Quando muda a subcategoria
  onSubcategoriaChange() {
    this.atualizarCategoriaNoProduto();
  }

  private atualizarCategoriaNoProduto() {
    if (this.categoriaSelecionadaId) {
      const catPai = this.categoriasFixas.find(c => c.id === this.categoriaSelecionadaId);
      if (catPai) {
        this.produto.categoria = new Categoria(
          catPai.nome,           
          catPai.id,             
          [],
          undefined,
          [],
          undefined
        );
      }
    } else {
      this.produto.categoria = null;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.produto.categoria) {
      Swal.fire('Atenção', 'Selecione uma categoria ou subcategoria', 'warning');
      return;
    }

    const operacao = this.modoEdicao
      ? this.produtoService.update(this.produtoEditandoId!, this.produto, this.selectedFile)
      : this.produtoService.save(this.produto, this.selectedFile);

    operacao.subscribe({
      next: () => {
        Swal.fire('Sucesso!', `Produto ${this.modoEdicao ? 'atualizado' : 'cadastrado'} com sucesso!`, 'success');
        this.resetForm();
        this.findAllProdutos();
      },
      error: (err) => {
        console.error('Erro:', err);
        Swal.fire('Erro', 'Falha ao salvar o produto.', 'error');
      }
    });
  }

  findAllProdutos() {
    this.produtoService.findAll().subscribe({
      next: (res) => this.produtos = res,
      error: (err) => console.error(err)
    });
  }

  resetForm() {
    this.produto = new Produto('', '', 0, 0, '', undefined);
    this.selectedFile = undefined;
    this.categoriaSelecionadaId = null;
    this.subcategoriaSelecionadaId = null;
    this.subcategoriasFiltradas = [];
    this.modoEdicao = false;
    this.produtoEditandoId = null;
  }

  editarProduto(produto: Produto) {
    this.produto = JSON.parse(JSON.stringify(produto));

    if (produto.categoria?.id) {
      // Verifica se o ID é de uma subcategoria
      const catPaiComSub = this.categoriasFixas.find(c =>
        c.subcategorias.some((s: any) => s.id === produto.categoria?.id)
      );

      if (catPaiComSub) {
        this.categoriaSelecionadaId = catPaiComSub.id;
        this.onCategoriaChange(); // preenche as subcategorias
        this.subcategoriaSelecionadaId = produto.categoria.id;
      } else {
        // É uma categoria pai
        this.categoriaSelecionadaId = produto.categoria.id;
        this.subcategoriaSelecionadaId = null;
        this.subcategoriasFiltradas = [];
      }
    }

    this.modoEdicao = true;
    this.produtoEditandoId = produto.id ?? null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  removerProduto(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.deleteById(id).subscribe({
          next: () => {
            Swal.fire('Removido!', 'Produto apagado com sucesso.', 'success');
            this.findAllProdutos();
          },
          error: () => Swal.fire('Erro', 'Não foi possível remover.', 'error')
        });
      }
    });
  }

  cancelarEdicao() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'As alterações não salvas serão perdidas.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, cancelar',
      cancelButtonText: 'Não, continuar editando',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.resetForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}