import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Usuarios } from '../../../models/usuario';
import { Login } from '../../../models/login';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRegisterActive = false;

  login: Login = new Login();

  usuario: Usuarios = {
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    user: '',
    enderecos: []
  };

  usuarioLogin = '';
  senhaLogin = '';

  router = inject(Router);
  authService = inject(AuthService);
  loginService = inject(LoginService);

  constructor(
    private usuarioServices: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  togglePanel() {
    this.isRegisterActive = !this.isRegisterActive;
  }

  logar() {
    // Popula o objeto login com os dados digitados
    this.login.email = this.usuarioLogin;
    this.login.cpf = this.usuarioLogin;
    this.login.password = this.senhaLogin;

    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) {
          this.loginService.addToken(token);
          this.router.navigate(['/principal/home']);
        } else {
          Swal.fire('Erro', 'Usuário ou senha incorretos!', 'error');
        }
      },
      error: erro => {
        Swal.fire('Erro', 'Não foi possível conectar com o servidor!', 'error');
        console.error('Erro no login:', erro);
      }
    });
  }

  save() {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.cpf ||
      !this.usuario.senha || !this.usuario.user) {
      this.snackBar.open('Preencha todos os campos!', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snack-bar']
      });
      return;
    }

    this.usuarioServices.save(this.usuario).subscribe({
      next: () => {
        this.snackBar.open('Salvo com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.usuario = {
          nome: '',
          email: '',
          cpf: '',
          senha: '',
          user: '',
          enderecos: []
        };

        this.isRegisterActive = false;
      },
      error: (err) => {
        console.error('Erro ao salvar usuário:', err);
        this.snackBar.open('Erro ao salvar! Verifique os dados.', 'Fechar', {
          duration: 5000,
          panelClass: ['error-snack-bar']
        });
      }
    });
  }
}
