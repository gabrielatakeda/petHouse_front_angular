import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos
import { Usuarios } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ MdbFormsModule, FormsModule ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuarios: Usuarios = {
    id: 0,
    nome: '',
    email: '',
    cpf:'',
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
          cpf:'',
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