import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuarios } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/usuarios';

  save(usuario: Usuarios) { //Método para salvar um usuário
    return this.http.post(`${this.apiUrl}/save`, usuario, { //Faz uma requisição POST para a API
      headers: { 'Content-Type': 'application/json' } //Define que o conteúdo enviado é JSON
    });
  }
  findById(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${this.apiUrl}/findById/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  update(id: number, usuario: Usuarios): Observable<Usuarios> {
    const payload = {
      ...usuario,
    //  dataNascimento: this.formatarData(usuario.dataNascimento)
    };
    return this.http.put<Usuarios>(`${this.apiUrl}/update/${id}`, payload);
  }

  findAll(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.apiUrl}/findAll`);
  }
}