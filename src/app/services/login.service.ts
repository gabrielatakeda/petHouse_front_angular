import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // INJEÇÃO DE DEPENDENCIA DO HTTPCLIENT - INJECT É UMA FUNÇÃO QUE FAZ A INJEÇÃO DE DEPENDENCIA
  http = inject(HttpClient); 

  API = 'http://localhost:8081/usuarios';

  login(cpfOuEmail: string, senha: string): Observable<Login> {
    return this.http.post<Login>(`${this.API}/login`, { cpfOuEmail, senha });
  }
  
  constructor() { }
}