import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: string;
  senha!: string;

  router = Inject(Router);

  logar(){
     if(this.usuario == "admin" && this.senha == "admin"){
     // this.router.navigate(['menu']);
    } else{
      alert("Login ou senha incorretos");
    }
  }

}
