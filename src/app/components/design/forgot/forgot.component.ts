import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos

@Component({
  selector: 'app-forgot',
  imports: [RouterLink],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {

  enviar(){
/*     this.Services.save(this.).subscribe({ //Chama o serviço para salvar o usuário no backend
          next: () => { //Caso o cadastro seja bem-sucedido
            Swal.fire({ //Exibe um alerta de sucesso
              title: 'Usuário cadastrado com sucesso!',
              icon: 'success',
              confirmButtonColor: '#28a745', //Cor verde no botão
              confirmButtonText: 'OK'
            });
             },
          error: () => { //Caso ocorra um erro no cadastro
            Swal.fire({ //Exibe um alerta de erro
              title: 'Não foi possível cadastrar o usuário. Tente novamente.',
              icon: 'error',
              confirmButtonColor: '#d33', //Cor vermelha no botão
              confirmButtonText: 'Fechar'
            });
          }
        }); */
  }

}
