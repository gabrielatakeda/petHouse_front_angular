//Importa as dependências necessárias do Angular
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { } //Construtor vazio

  private http = inject(HttpClient); //Injeção manual do HttpClient para usar nas requisições
  private apiUrl = 'http://localhost:8080/usuarios'; //URL base da API

  save(usuario: Usuario) { //Método para salvar um usuário
  return this.http.post(`${this.apiUrl}/save`, usuario, { //Faz uma requisição POST para a API
    headers: { 'Content-Type': 'application/json' } //Define que o conteúdo enviado é JSON
  });
}
}