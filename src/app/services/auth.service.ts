import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/usuarios';
  private role: string | null = null;

  // Guarda o usuário logado
  private _usuarioLogado = new BehaviorSubject<any>(null);
  usuarioLogado$ = this._usuarioLogado.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(usuarioLogin: string, senha: string): Observable<boolean> {
    const body = { usuarioLogin, senha };

    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        if (response) {
          this.role = response.role?.toLowerCase() || 'user';
          this._usuarioLogado.next(response); // salva o usuário logado
        }
      }),
      tap(() => true),
      catchError(() => of(false))
    );
  }

  getUserRole(): string | null {
    return this.role;
  }

  getUsuario(): any {
    return this._usuarioLogado.value;
  }

  logout() {
    this.role = null;
    this._usuarioLogado.next(null);
  }
}
