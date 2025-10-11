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
    categoria: null,
    urlFoto: ''
  };

  produtos: Produto[] = [];

  categorias: Categoria[] = [];
  selectedFile?: File;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.produtoService.save(this.produto, this.selectedFile).subscribe({
      next: () => {
        //Caso o cadastro seja bem-sucedido
        Swal.fire({ //Exibe um alerta de sucesso
          title: 'Produto cadastrado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#28a745', //Cor verde no botão
          confirmButtonText: 'OK'
        });
        this.produto = { nome: '', descricao: '', precoVenda: 0, quantidade: 0, categoria: { nome: '' }, urlFoto: '' };
        this.selectedFile = undefined;
        this.findAll(); //Atualiza a lista de produtos
      },
      error: (err: any) => { //Caso ocorra um erro no cadastro
        Swal.fire({ //Exibe um alerta de erro
          title: 'Não foi possível cadastrar o usuário. Tente novamente.',
          icon: 'error',
          confirmButtonColor: '#d33', //Cor vermelha no botão
          confirmButtonText: 'Fechar'
        });
      }
    });
  }

  findAll() {
    this.categoriaService.findAll().subscribe({
      next: (resposta) => this.categorias = resposta,
      error: (err) => console.error('Erro ao carregar categorias', err)
    });

    this.produtoService.findAll().subscribe({
      next: (resposta) => this.produtos = resposta,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }
}