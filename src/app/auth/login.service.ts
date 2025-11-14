import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "./login";

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    http = inject(HttpClient);
    API = "http://localhost:8080/api/login";

    constructor(){}

    //Envia o usuário e senha para o backend
    logar(login: Login): Observable<string>{ //Vai receber um objeto do tipo login e emite uma string (token JWT que o servidor devolve após um login bem-sucedido)
        return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'}); //Requisição post
    } //Token em texto puro, precisa "forçar" ele a tratar o texto como se fosse um JSON, mas sem parsear

    addToken(token: string){ //Recebe como parâmetro o token que o backend enviou após o login
        localStorage.setItem('token', token); //Aqui é salvo no navegador, o localStorage é um armazenamento permanente
    }

    removeToken(){ //Remove o token passado no navegador que estava salvo no localStorage
        localStorage.removeItem('token');
    }

    getToken(){ //Pega o token salvo no localStorage
        return localStorage.getItem('token'); //Acessa e retorna o valor do token
    }

    jwtDecode(){
        let token = this.getToken(); //pega o token armazenado no localStorage e o valor retornado é armazenado na variável
        if(token){ //Verifica se o token existe e não está vazio
            //return jwtDecode<JwtPayload>(token); //Apenas abre o token e mostra o que tem dentro dela
        }
        return ""; //Se o token não existir, retorna uma string vazia
    }
}
