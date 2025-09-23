import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuario?: Usuario;  // Usuario carregado do backend
  usuarioService = inject(UsuarioService);

  constructor() {
    const idUsuario = 3; // temporário apenas para teste
    this.findById(idUsuario);
  }

  findById(id: number) {
    this.usuarioService.findById(id).subscribe({
      next: result => {
        console.log(result)
        console.log(result.enderecos[0])
        this.usuario = result;
      },
      error: erro => {
        alert("Ocorreu um erro ao buscar o usuário");
      }
    });
  }

}
