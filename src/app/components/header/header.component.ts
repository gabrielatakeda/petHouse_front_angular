import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule]
})
export class HeaderComponent {
  userName: string = 'Visitante'; 
  isAccountMenuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  closeAccountMenu() {
    this.isAccountMenuOpen = false;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}