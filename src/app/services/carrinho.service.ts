import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  urlFoto: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl = 'http://localhost:8080/carrinho'; // URL da sua API

  constructor(private http: HttpClient) {}

  listarItens(): Observable<ItemCarrinho[]> {
    return this.http.get<ItemCarrinho[]>(`${this.apiUrl}/itens`);
  }
}
