import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Usuarios } from '../../../models/usuario';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
 
 
  logar() {
  this.authService.login(this.usuarioLogin, this.senhaLogin).subscribe(success => {
    console.log(this.usuarioLogin, this.senhaLogin)//console.log de  teste
    if (success) {
      const role = this.authService.getUserRole();
      if (role === 'admin') {
        this.router.navigate(['/principalAdmin/dashboard']);
      } else {
        this.router.navigate(['/principal/home']);
      }
    } else {
      Swal.fire('Erro', 'Usuário ou senha incorretos', 'error');
    }
  });
}

  save() { //Método chamado quando o botão "Salvar" é clicado
    console.log(this.usuario)
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