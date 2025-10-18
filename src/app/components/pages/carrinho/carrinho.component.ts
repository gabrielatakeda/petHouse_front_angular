import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule], // 
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent {

cartItems: any[] = [];

pagamentoSelecionado: string = '';
  
}