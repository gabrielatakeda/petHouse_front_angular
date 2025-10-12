//Importa as dependências necessárias do Angular
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { } //Construtor vazio

  private http = inject(HttpClient); //Injeção manual do HttpClient para usar nas requisições
  private API = 'http://localhost:8080/usuarios'; //URL base da API

  save(usuario: Usuarios) { //Método para salvar um usuário
  return this.http.post("http://localhost:8080/usuarios/save", usuario, { //Faz uma requisição POST para a API
    headers: { 'Content-Type': 'application/json' } //Define que o conteúdo enviado é JSON
  });
}
}