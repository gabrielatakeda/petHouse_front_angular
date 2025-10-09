import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos
import { UsuarioService } from '../../../services/usuario.service';
import { Usuarios } from '../../../models/usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isRegisterActive = false;

  usuario: Usuarios = { //Objeto 'usuario' inicializado vazio, será preenchido pelos campos do formulário através do [(ngModel)]
    nome: '',
    email: '',
    senha: '',
    usuario: ''
  };

  usuarioLogin = '';
  senhaLogin = '';

  router = inject(Router);

  constructor(private usuarioServices: UsuarioService, private snackBar: MatSnackBar) { } //Injeta o serviço de usuários no construtor para poder usá-lo

  togglePanel() {
    this.isRegisterActive = !this.isRegisterActive;
  }

  logar() {
    if (this.usuarioLogin === 'admin' && this.senhaLogin === 'admin') {
      this.router.navigate(['/home']);
    }
  }

  save() { //Método chamado quando o botão "Salvar" é clicado
    this.usuarioServices.save(this.usuario).subscribe(() => {
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


    });
  }
}

