import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos
import { ForgotPasswordService } from '../../../services/forgot-password.service';

@Component({
  selector: 'app-forgot',
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {

  form = {
    email: ''
  };

  constructor(private forgotService: ForgotPasswordService) {}
enviar() {
    const email = this.form.email;

    if (!email) {
      Swal.fire({
        title: 'Digite um e-mail válido!',
        icon: 'warning',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Fechar'
      });
      return;
    }else{

    this.forgotService.enviarEmailRecuperacao(email)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'E-mail enviado com sucesso!',
            text: 'Verifique sua caixa de entrada para continuar.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            confirmButtonText: 'OK'
          });
        },
        error: () => {
          Swal.fire({
            title: 'Erro ao enviar o e-mail!',
            text: 'Verifique se o e-mail está correto e tente novamente.',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Fechar'
          });
        }
      });
  }
}
}
