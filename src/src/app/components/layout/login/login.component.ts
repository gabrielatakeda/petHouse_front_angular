import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { routes } from '../../../app.routes';


@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: String;
  senha!: String;

  router = inject(Router);

  logar(){
    if(this.usuario == 'admin' && this.senha == 'admin'){
      this.router.navigate(['admin/carros']);
    }else{
      alert('Usuário ou senha estão incorretos!');
    }
  }


}
