import { Component, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule , FormsModule , RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: string;
  senha!: string;

  router = inject(Router);
  
  logar(){
     if(this.usuario == "admin" && this.senha == "admin"){
      this.router.navigate(['/home']);
    } else{
      alert("Login ou senha incorretos");
    }
  }

}
