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

  ngOnInit(): void {
  this.findAllProdutos(); 
}

  categoriasFixas = [
    {
      id: 1,
      nome: 'Alimentação',
      subcategorias: [
        { id: 11, nome: 'Ração Seca' },
        { id: 12, nome: 'Ração Úmida' },
        { id: 13, nome: 'Petiscos' },
        { id: 14, nome: 'Suplementos' }
      ]
    },
    {
      id: 2,
      nome: 'Higiene e Cuidados',
      subcategorias: [
        { id: 21, nome: 'Shampoos' },
        { id: 22, nome: 'Condicionadores' },
        { id: 23, nome: 'Perfumes' },
        { id: 24, nome: 'Escovas' },
        { id: 25, nome: 'Tapetes Higiênicos' }
      ]
    },
    {
      id: 3,
      nome: 'Acessórios',
      subcategorias: [
        { id: 31, nome: 'Roupinhas' },
        { id: 32, nome: 'Guias' },
        { id: 33, nome: 'Coleiras' },
        { id: 34, nome: 'Camas' },
        { id: 35, nome: 'Comedouros' },
        { id: 36, nome: 'Bebedouros' }
      ]
    },
    {
      id: 4,
      nome: 'Brinquedos',
      subcategorias: [
        { id: 41, nome: 'Bolinhas' },
        { id: 42, nome: 'Pelúcias' },
        { id: 43, nome: 'Mordedores' },
        { id: 44, nome: 'Arranhadores' },
        { id: 45, nome: 'Interativos' }
      ]
    },
    {
      id: 5,
      nome: 'Saúde e Bem-Estar',
      subcategorias: [
        { id: 51, nome: 'Antipulgas' },
        { id: 52, nome: 'Vermífugos' },
        { id: 53, nome: 'Vitaminas' },
        { id: 54, nome: 'Medicamentos' }
      ]
    }
  ];

  dropdownAberto: number | null = null;

  constructor(private produtoService: ProdutoService) {}

  toggleDropdown(id: number) {
    this.dropdownAberto = this.dropdownAberto === id ? null : id;
  }

  selecionarSubcategoria(sub: any, paiId: number) {
    this.produto.categoria = new Categoria(
      sub.nome,
      sub.id,
      [],
      undefined,
      [],
      { id: paiId }
    );
    this.dropdownAberto = null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
  if (!this.produto.categoria) {
    Swal.fire('Atenção', 'Selecione uma categoria', 'warning');
    return;
  }

  const operacao = this.modoEdicao
    ? this.produtoService.update(this.produtoEditandoId!, this.produto, this.selectedFile)
    : this.produtoService.save(this.produto, this.selectedFile);

  operacao.subscribe({
    next: () => {
      const msg = this.modoEdicao ? 'atualizado' : 'cadastrado';
      Swal.fire('Sucesso!', `Produto ${msg} com sucesso!`, 'success');
      this.resetForm();
      this.findAllProdutos();
    },
    error: (err) => {
      console.error(err);
      Swal.fire('Erro', `Falha ao ${this.modoEdicao ? 'atualizar' : 'cadastrar'}.`, 'error');
    }
  });
}

finalizar(msg: string) {
  Swal.fire('Sucesso!', `Produto ${msg}!`, 'success');
  this.resetForm();
  this.findAllProdutos();
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
  this.modoEdicao = false;
  this.produtoEditandoId = null;
}

  categoriaSelecionadaId: number | null = null;

selecionarCategoriaPai() {
  if (this.categoriaSelecionadaId) {
    const cat = this.categoriasFixas.find(c => c.id === this.categoriaSelecionadaId);
    if (cat) {
      this.produto.categoria = new Categoria(
        cat.nome,
        cat.id,
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

modoEdicao: boolean = false;
produtoEditandoId: number | null = null;

editarProduto(produto: Produto) {
  this.produto = { ...produto };
  this.categoriaSelecionadaId = produto.categoria?.id || null;
  this.modoEdicao = true;
  this.produtoEditandoId = produto.id || null;


  window.scrollTo(0, 0);
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
        error: () => {
          Swal.fire('Erro', 'Não foi possível remover.', 'error');
        }
      });
    }
  });
}

}