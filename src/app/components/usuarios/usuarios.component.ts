import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Usuarios } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuario?: Usuarios;  
  usuarioService = inject(UsuarioService);

  constructor() {
    const idUsuario = 3; // temporário para teste
    this.findById(idUsuario);
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