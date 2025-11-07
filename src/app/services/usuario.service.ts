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

  save(usuario: Usuarios): Observable<Usuarios> {
    const payload = {
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      senha: usuario.senha,
      user: usuario.user,
      dataNascimento: this.formatarData(usuario.dataNascimento), 
      enderecos: usuario.enderecos || []
    };

    return this.http.post<Usuarios>(`${this.apiUrl}/save`, payload);
  }

  private formatarData(date: Date | string | null): string | null {
    if (!date) {
      return null; 
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return null;
    }

    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`; 
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
      dataNascimento: this.formatarData(usuario.dataNascimento)
    };
    return this.http.put<Usuarios>(`${this.apiUrl}/update/${id}`, payload);
  }

  findAll(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.apiUrl}/findAll`);
  }
}