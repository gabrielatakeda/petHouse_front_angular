import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';

export interface Categoria {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  constructor() { }

  URL_API = 'http://localhost:8080/api/produtos';
  private http = inject(HttpClient); //Injeção manual do HttpClient para usar nas requisições

  findByName(nome: string){
    return this.http.get<Produto[]>(`${this.URL_API}/nome/${nome}`);
  }

  findAll(){
    return this.http.get<Produto[]>(`${this.URL_API}/findAll`);
  }

  save(produto: Produto, file?: File): Observable<Produto>{
    const formData = new FormData();
    formData.append('produto', new Blob([JSON.stringify(produto)], { type: 'application/json' }));
    if(file){
      formData.append('file', file);
    }
    return this.http.post<Produto>(this.URL_API, formData);
  }

  update(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.URL_API}/update/${id}`, produto);
  }

  deleteById(id: number): Observable<void>{
    return this.http.delete<void>(`${this.URL_API}/deleteById/${id}`);
  }

}
