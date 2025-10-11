import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'   // Isso faz dele um service global
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // 'admin' ou 'user'
    const userRole = this.authService.getUserRole();

    if(userRole === expectedRole){
      return true;   // rota liberada
    }

    this.router.navigate(['/login']);  // redireciona se não tiver permissão
    return false;
  }
}
