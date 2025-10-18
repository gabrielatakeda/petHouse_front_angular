import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  

  openMenu: string | null = null;

 // Guarda o estado (aberto ou fechado) de cada menu
  openMenus: { [key: string]: boolean } = {
    produtos: false,
    categorias: false,
    clientes: false,
  };

  toggleMenu(menu: string): void {
    // Inverte o estado do menu clicado
    this.openMenus[menu] = !this.openMenus[menu];
  }

  
}
