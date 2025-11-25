import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);
  URL_API = 'http://localhost:8080/produtos';

  findByName(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.URL_API}/nome/${nome}`);
  }

  findById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.URL_API}/findById/${id}`);
  }

  findAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.URL_API}/findAll`);
  }

  save(produto: Produto, file?: File): Observable<Produto> {
    const formData = new FormData();
    formData.append('produto', new Blob([JSON.stringify(produto)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<Produto>(this.URL_API, formData);
  }


update(id: number, produto: Produto, file?: File): Observable<Produto> {
  if (file) {
    // Tem imagem → FormData
    const formData = new FormData();
    formData.append('produto', new Blob([JSON.stringify(produto)], { type: 'application/json' }));
    formData.append('file', file);
    return this.http.put<Produto>(`${this.URL_API}/update/${id}`, formData);
  } else {
    // Sem imagem → JSON puro
    return this.http.put<Produto>(`${this.URL_API}/update/${id}`, produto);
  }
}
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/deleteById/${id}`);
  }
}