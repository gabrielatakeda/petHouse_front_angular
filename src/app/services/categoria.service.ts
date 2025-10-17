import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/findAll`);
  }

  save(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/save`, categoria);
  }

 criarSubcategoria(slugOuId: string | number, subcategoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/${slugOuId}/subcategorias`, subcategoria);
  }

  update(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/update/${id}`, categoria);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }


findCategoriasPai(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/pai`);
  }

  findSubcategorias(id:number): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/${id}/subcategorias`);
  }


};