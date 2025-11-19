import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
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
  loginService = inject(LoginService); //Para usar o Service dentro de um componente, deve ser feito a injeção

  constructor(
    private usuarioServices: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  togglePanel() {
    this.isRegisterActive = !this.isRegisterActive;
  }
 
 
/*   logar(){ //Requisição HTTP de uma função logar que está dentro do auth (login.service)
    this.loginService.logar(this.login).subscribe({
      next: token => ( //Se der certo, token é o retorno que eu vou receber do servidor
        if(token){ //Usuário e senha digitados corretos, verifica se o backend realmente retornou um token válido
          this.loginService.addToken(token); //Salva o token no localStorage
          this.router.navigate(['/principal/home']); //Redireciona para a página inicial
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
    this.authService.login(this.usuarioLogin, this.senhaLogin).subscribe({
      next: (success) => {
        if (success) {
          const role = this.authService.getUserRole();
          if (role === 'admin') {
            this.router.navigate(['/principalAdmin/dashboard']);
          } else {
            this.router.navigate(['/home']);
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