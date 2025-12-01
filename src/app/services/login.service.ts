import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // INJEÇÃO DE DEPENDENCIA DO HTTPCLIENT - INJECT É UMA FUNÇÃO QUE FAZ A INJEÇÃO DE DEPENDENCIA
  http = inject(HttpClient); 
  apiUrl = 'http://localhost:8080/usuarios';

  // login(cpfOuEmail: string, senha: string): Observable<Login> {
  //   return this.http.post<Login>(`${this.API}/login`, { cpfOuEmail, senha });
  // }
  
  constructor() { }

  // Função para logar
  logar(login: Login): Observable<string | null> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, login)
      .pipe(
        map(response => response.token || null)
      );
  }

  // Função para salvar o token no localStorage
  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Recupera o token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Remove o token
  logout() {
    localStorage.removeItem('token');
  }
}