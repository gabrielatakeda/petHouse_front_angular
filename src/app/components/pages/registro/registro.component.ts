import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos
import { Usuarios } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ MdbFormsModule, FormsModule ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  isRegisterActive = false;

  usuario: Usuarios = {
    nome: '',
    email: '',
    cpf:'',
    senha: '',
    user: '',
    dataNascimento: new Date(),
    enderecos: []   // ✅ inicia vazio
  };

  usuarioLogin = '';
  senhaLogin = '';

  router = inject(Router);
  authService = inject(AuthService);

  constructor(private usuarioServices: UsuarioService, private snackBar: MatSnackBar) { } //Injeta o serviço de usuários no construtor para poder usá-lo

  togglePanel() {
    this.isRegisterActive = !this.isRegisterActive;
  }
 

  save() { //Método chamado quando o botão "Salvar" é clicado
      this.usuarioServices.save(this.usuario).subscribe({
        next: () => {
          this.snackBar.open('Salvo com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Erro ao salvar!', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }

}