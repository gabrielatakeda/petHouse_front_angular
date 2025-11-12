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

    logar(login: Login): Observable<string>{
        return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
    }

    addToken(token: string){
        localStorage.setItem('token', token);
    }
}
