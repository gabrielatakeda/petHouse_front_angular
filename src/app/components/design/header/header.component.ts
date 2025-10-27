import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Usuarios } from '../../../models/usuario';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  isAccountMenuOpen: boolean = false;
  usuario: Usuarios = new Usuarios("","","","","",new Date,[]);

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    //pega o usuario que logou no "login"
    this.authService.usuarioLogado$.subscribe(usuario => {
      this.userName = usuario ? usuario.user : '';
      this.usuario = usuario;
      console.log(usuario, this.usuario);
    });
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  closeAccountMenu() {
    this.isAccountMenuOpen = false;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToUsuario() {
    this.router.navigate(["principal/usuario"])
  }

goToHome() {
  this.router.navigate(["princiapal/home"])
}

}
