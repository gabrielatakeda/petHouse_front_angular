import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterLink] // Adicionado para usar *ngIf
 // Adicionado para usar *ngIf
})
export class HeaderComponent {
  userName: string = 'João';
  isAccountMenuOpen: boolean = false;

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  closeAccountMenu() {
    this.isAccountMenuOpen = false; // Fecha o menu
  }
}