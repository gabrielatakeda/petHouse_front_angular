import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Usuarios } from '../../../models/usuario';
//import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../models/login';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
    dataNascimento: '',  
    enderecos: []
  };

  usuarioLogin = '';
  senhaLogin = '';

  router = inject(Router);
  authService = inject(AuthService);

  constructor(
    private usuarioServices: UsuarioService,
<<<<<<< HEAD
    private snackBar: MatSnackBar
  ) { }
=======
    private snackBar: MatSnackBar,
  ) { 
    this.loginService.removeToken(); //Apaga o token do LocalStorage
  }
>>>>>>> origin/poly6

  togglePanel() {
    this.isRegisterActive = !this.isRegisterActive;
  }

  logar() {
    this.authService.login(this.usuarioLogin, this.senhaLogin).subscribe({
      next: (success) => {
        if (success) {
          const role = this.authService.getUserRole();
          if (role === 'admin') {
            this.router.navigate(['/principalAdmin/dashboard']);
          } else {
<<<<<<< HEAD
            this.router.navigate(['/home']);
=======
            this.router.navigate(['/principal/home']);
>>>>>>> origin/poly6
          }
        } else {
          Swal.fire('Erro', 'Usuário ou senha incorretos', 'error');
        }
      },
      error: () => {
        Swal.fire('Erro', 'Erro ao conectar com o servidor', 'error');
      }
    });
  }

  save() {

<<<<<<< HEAD
=======
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.cpf || 
        !this.usuario.senha || !this.usuario.user) {
      this.snackBar.open('Preencha todos os campos!', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snack-bar']
      });
      return;
    }

>>>>>>> origin/poly6
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
          dataNascimento: new Date(),
          enderecos: []
        };
       
        this.isRegisterActive = false;
      },
      error: (err) => {
        console.error('Erro ao salvar usuário:', err);
        this.snackBar.open('Erro ao salvar! Verifique os dados.', 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}