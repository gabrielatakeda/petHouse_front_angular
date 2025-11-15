import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Usuarios } from '../../../models/usuario';
import { LoginService } from '../../../auth/login.service';
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
  loginService = inject(LoginService); //Para usar o Service dentro de um componente, deve ser feito a injeção

  constructor(private usuarioServices: UsuarioService, private snackBar: MatSnackBar) { } //Injeta o serviço de usuários no construtor para poder usá-lo

  togglePanel() {
    this.isRegisterActive = !this.isRegisterActive;
  }
 
 
/*   logar(){ //Requisição HTTP de uma função logar que está dentro do auth (login.service)
    this.loginService.logar(this.login).subscribe({
      next: token => ( //Se der certo, token é o retorno que eu vou receber do servidor
        if(token){ //Usuário e senha digitados corretos, verifica se o backend realmente retornou um token válido
          this.loginService.addToken(token); //Salva o token no localStorage
        }else{ //O token pode chegar nulo, ou seja, usuário ou senha incorretos
            alert('Usuário ou senha incorretos!');
          }
      ),
      error: erro => { //Se der erro
        alert('Deu erro!');
      }
    });
  } */

  logar() {
  this.authService.login(this.usuarioLogin, this.senhaLogin).subscribe(success => {
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