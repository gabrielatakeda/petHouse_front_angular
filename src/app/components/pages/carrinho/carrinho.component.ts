import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // 
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { EnderecoService } from '../../../services/endereco.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // 
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})

export class CarrinhoComponent {

  pagamentoSelecionado: string = '';

  erroFinalizacao: string | null = null;
  enderecosAbertos = false;
  mostrarModalEndereco = false;
  erroEndereco: string | null = null;

  enderecos: any[] = [];

  enderecoSelecionado: any = null;       // endereço final selecionado
  enderecoTempSelecionado: any = null;   // usado enquanto o usuário está escolhendo

  constructor(private enderecoService: EnderecoService) { }

  ngOnInit(): void {
    this.carregarEnderecos();
  }

  carregarEnderecos() {
    this.enderecoService.findAll().subscribe(data => {
      this.enderecos = data;
    });
  }
  toggleEnderecos() {
    this.enderecosAbertos = !this.enderecosAbertos;
  }

  confirmarEndereco() {
    if (!this.enderecoTempSelecionado) {
      this.erroEndereco = "Selecione um endereço antes de continuar.";
      return;
    }

    this.enderecoSelecionado = this.enderecoTempSelecionado;
    this.enderecosAbertos = false;
    this.erroEndereco = null;
  }

 finalizarCompra() {
  this.erroFinalizacao = null; // reset erro

  // Verificar endereço
  if (!this.enderecoSelecionado) {
    this.enderecosAbertos = true;
    this.erroEndereco = "Selecione um endereço antes de finalizar.";
  }

  // Verificar forma de pagamento
  if (!this.pagamentoSelecionado) {
    this.erroFinalizacao = "Selecione uma forma de pagamento antes de finalizar.";
  }
}

}