// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Usuarios } from '../../../models/usuario';

interface Category {
  name: string;
  dropdown: boolean;
  isOpen: boolean;
  dropdownItems: string[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  isAccountMenuOpen: boolean = false;
  usuario: Usuarios = new Usuarios("", "", "", "", "", new Date(), []);
  
  categories: Category[] = [
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
      name: 'Brinquedos',
      dropdown: true,
      isOpen: false,
      dropdownItems: ['Bolinhas', 'Pelúcias', 'Mordedores', 'Arranhadores', 'Interativos'],
    },
    {
      name: 'Saúde e Bem-Estar',
      dropdown: true,
      isOpen: false,
      dropdownItems: ['Antipulgas', 'Vermífugos', 'Vitaminas', 'Medicamentos'],
    }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.usuarioLogado$.subscribe(usuario => {
      this.userName = usuario ? usuario.user : '';
      this.usuario = usuario || new Usuarios("", "", "", "", "", new Date(), []);
    });
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  closeAccountMenu() {
    this.isAccountMenuOpen = false;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToUsuario() {
    this.router.navigate(['/usuario']);
  }

  goToMenu() {
    this.router.navigate(['/home']);
  }

  onMouseEnter(categoryName: string): void {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category && category.dropdown) {
      category.isOpen = true;
      this.categories
        .filter(cat => cat.name !== categoryName)
        .forEach(cat => cat.isOpen = false);
    }
  }

  onMouseLeave(categoryName: string): void {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category && category.dropdown) {
      category.isOpen = false;
    }
  }
}