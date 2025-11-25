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

  // 🔹 Signal para mostrar/esconder formulário de subcategoria
  showSubcategoriaForm = signal(false);

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

  // 🔹 Alternar visibilidade do formulário
  toggleSubcategoriaForm() {
    this.showSubcategoriaForm.update(v => !v);
  }

  // --- Métodos de listagem e salvar (sem alterações) ---
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

  salvarSubcategoria() {
    if (this.subcategoriaForm.invalid) return;

    const nome = this.subcategoriaForm.value.nomeSubcategoria?.trim();
    const slugPai = this.subcategoriaForm.value.categoriaPai;

    if (!nome || !slugPai) {
      alert('Preencha todos os campos!');
      return;
    }

    const subcategoria = { nome };

    this.categoriaService.criarSubcategoria(slugPai, subcategoria).subscribe({
      next: () => {
        alert('Subcategoria cadastrada com sucesso!');
        this.subcategoriaForm.reset();
        this.findCategoriasPai();
        this.showSubcategoriaForm.set(false); // 🔹 Esconde o formulário após salvar
      },
      error: (err) => {
        console.error('Erro ao salvar subcategoria:', err);
        alert('Erro ao salvar subcategoria.');
      }
    });
  }
}
