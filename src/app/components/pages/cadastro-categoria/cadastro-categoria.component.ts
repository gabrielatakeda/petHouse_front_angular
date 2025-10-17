import { Component, signal } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-categoria',
  imports: [FormsModule, ReactiveFormsModule , CommonModule],
  templateUrl: './cadastro-categoria.component.html',
  styleUrl: './cadastro-categoria.component.scss'
})
export class CadastroCategoriaComponent {

  categoriasPai: Categoria[] = [];
  subcategorias: Categoria[] = [];
  categoriaSelecionadaId: number | null = null;

  // Sinais para controlar a exibição condicional (substitui ifs de template)
  showCadastro = signal(false);
  tipoCadastro = signal<'categoria' | 'subcategoria' | null>(null);

  // Formulários reativos
  categoriaForm: FormGroup;
  subcategoriaForm: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder
  ) {
    this.categoriaForm = this.fb.group({
  nome: ['', Validators.required]
});

this.subcategoriaForm = this.fb.group({
  categoriaPai: [null, Validators.required],
  nomeSubcategoria: ['', Validators.required]
});

  }

  ngOnInit(): void {
    this.findCategoriasPai();
  }

  // Exibe a área de cadastro
  onCadastrarClick() {
    this.showCadastro.set(true);
  }

  // Define o tipo de cadastro escolhido
  onTipoChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'categoria' | 'subcategoria' | null;
    this.tipoCadastro.set(value);
  }

  //METODO PARA EXIBIR CATEGORIAS E SUBCATEGORIAS
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

  //METODO SALVAR
 salvarCategoria() {
  if (this.categoriaForm.invalid) return;

  const nome = this.categoriaForm.value.nome?.trim();

  if (!nome) {
    alert('Digite o nome da categoria!');
    return;
  }

  const categoria: any = { nome };
this.categoriaService.save(categoria).subscribe({
    next: (res) => {
      // adiciona à lista local sem precisar recarregar tudo
      this.categoriasPai.push(res);

      alert(`Categoria "${res.nome}" cadastrada com sucesso!`);
      this.categoriaForm.reset();
    },
    error: (err) => {
      console.error('Erro ao salvar categoria:', err);
      alert('Erro ao salvar categoria.');
    },
  });
}


salvarSubcategoria() {
  
  if (this.subcategoriaForm.invalid) return;

  const nome = this.subcategoriaForm.value.nomeSubcategoria?.trim();
  const slugPai = this.subcategoriaForm.value.categoriaPaiSlug; // pegar slug da categoria pai

 

  if (!nome) {
    alert('Digite o nome da subcategoria!');
    return;
  }
  if (!slugPai) {
    alert('Selecione uma categoria pai!');
    return;
  }

  const subcategoria: any = {
    nome // categoriaPai não precisa no body, backend associa pelo slugPai
  };

   console.log('slugPai selecionado:', slugPai);
  this.categoriaService.criarSubcategoria(slugPai, subcategoria).subscribe({
    next: () => {
      alert('Subcategoria cadastrada com sucesso!');
      this.subcategoriaForm.reset();
      this.findCategoriasPai(); // atualizar lista de categorias pai
    },
    error: (err) => {
      console.error('Erro ao salvar subcategoria:', err);
      alert('Erro ao salvar subcategoria.');
    }
  });
}
}
