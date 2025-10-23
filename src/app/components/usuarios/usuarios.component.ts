import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Usuarios } from '../../models/usuario';
import { HeaderComponent } from "../design/header/header.component";
import { AuthService } from '../../services/auth.service';
import { MiniPromoComponent } from "../design/mini-promo/mini-promo.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, NgIf, MiniPromoComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  authService = inject(AuthService)
  usuario?: Usuarios;
  usuarioService = inject(UsuarioService);
  idUsuario!: number;

  constructor() {
    this.authService.usuarioLogado$.subscribe(usuario => {
      this.idUsuario = usuario.id;
    }); 
    this.findById(this.idUsuario);
  }

  findById(id: number) {
    this.usuarioService.findById(id).subscribe({
      next: result => {
        console.log(result);
        if (result.enderecos && result.enderecos.length > 0) {
          console.log(result.enderecos[0]);
        }
        this.usuario = result;
      },
      error: () => {
        alert("Ocorreu um erro ao buscar o usuário");
      }
    });
  }
}