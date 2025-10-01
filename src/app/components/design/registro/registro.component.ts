import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { HeaderComponent } from "../../header/header.component";
import { Usuarios } from '../../../models/usuarios';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, HeaderComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuarios: Usuarios = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    user: '',
    enderecos: []   // ✅ inicia vazio
  };

  constructor(private usuarioServices: UsuarioService) {}

  save() {
    this.usuarioServices.save(this.usuarios).subscribe({
      next: () => {
        Swal.fire({
          title: 'Usuário cadastrado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        // reset
        this.usuarios = {
          id: 0,
          nome: '',
          email: '',
          senha: '',
          user: '',
          enderecos: []   // ✅ array vazio no reset também
        };
      },
      error: () => {
        Swal.fire({
          title: 'Não foi possível cadastrar o usuário. Tente novamente.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Fechar'
        });
      }
    });
  }
}