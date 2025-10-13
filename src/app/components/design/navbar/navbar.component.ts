import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  categories = [
    {
      name: 'Alimentação',
      dropdown: true,
      isOpen: false,
      dropdownItems: ['Ração Seca', 'Ração Úmida', 'Petiscos', 'Suplementos'],
    },
    {
      name: 'Higiene e Cuidados',
      dropdown: true,
      isOpen: false,
      dropdownItems: ['Shampoos', 'Condicionadores', 'Perfumes', 'Escovas', 'Tapetes Higiênicos'],
    },
    {
      name: 'Acessórios',
      dropdown: true,
      isOpen: false,
      dropdownItems: ['Roupinhas', 'Guias', 'Coleiras', 'Camas', 'Comedouros', 'Bebedouros'],
    },
    {
      name: 'Transporte',
      dropdown: false,
      isOpen: false,
      dropdownItems: [],
    },
    {
      name: 'Brinquedos',
      dropdown: true,
      isOpen: false,
      dropdownItems: ['Bolinhas', 'Pelúcias', 'Mordedores', 'Arranhadores', 'Interativos'],
    },
    {
      name: 'Casas e tocas',
      dropdown: false,
      isOpen: false,
      dropdownItems: [],
    },
    {
      name: 'Saúde e Bem-Estar',
      dropdown: true,
      isOpen: false,
      dropdownItems: ['Antipulgas', 'Vermífugos', 'Vitaminas', 'Medicamentos'],
    },
    {
      name: 'Suporte ao Cliente',
      dropdown: false,
      isOpen: false,
      dropdownItems: [],
    },
  ];

  // Função para abrir o dropdown ao passar o mouse
  onMouseEnter(categoryName: string): void {
    const category = this.categories.find((cat) => cat.name === categoryName);
    if (category && category.dropdown) {
      category.isOpen = true;
      // Fecha outros dropdowns abertos
      this.categories
        .filter((cat) => cat.name !== categoryName)
        .forEach((cat) => (cat.isOpen = false));
    }
  }

  // Função para fechar o dropdown ao tirar o mouse
  onMouseLeave(categoryName: string): void {
    const category = this.categories.find((cat) => cat.name === categoryName);
    if (category && category.dropdown) {
      category.isOpen = false;
    }
  }
}