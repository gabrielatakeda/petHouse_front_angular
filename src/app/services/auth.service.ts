import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  private role: string | null = null;

  login(usuario: string, senha: string): boolean {
    if(usuario === 'admin' && senha === 'admin'){
      this.role = 'admin';
      return true;
    } else if(usuario === 'user' && senha === 'user'){
      this.role = 'user';
      return true;
    }
    return false;
  }

  getUserRole(): string | null {
    return this.role;
  }

  logout() {
    this.role = null;
  }
}
