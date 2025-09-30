import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; //Biblioteca para exibir alertas bonitos
import { Usuarios } from '../../../models/usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ MdbFormsModule, FormsModule , HeaderComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario: Usuarios = { //Objeto 'usuario' inicializado vazio, será preenchido pelos campos do formulário através do [(ngModel)]
    nome: '',
    email: '',
    senha: '',
    usuario: ''
  };

  constructor(private usuarioServices: UsuarioService) {} //Injeta o serviço de usuários no construtor para poder usá-lo

  save() { //Método chamado quando o botão "Salvar" é clicado
    this.usuarioServices.save(this.usuario).subscribe({ //Chama o serviço para salvar o usuário no backend
      next: () => { //Caso o cadastro seja bem-sucedido
        Swal.fire({ //Exibe um alerta de sucesso
          title: 'Usuário cadastrado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#28a745', //Cor verde no botão
          confirmButtonText: 'OK'
        });
        this.usuario = { nome: '', email: '', senha: '', usuario: '' }; //Limpa o formulário resetando o objeto usuario
      },
      error: () => { //Caso ocorra um erro no cadastro
        Swal.fire({ //Exibe um alerta de erro
          title: 'Não foi possível cadastrar o usuário. Tente novamente.',
          icon: 'error',
          confirmButtonColor: '#d33', //Cor vermelha no botão
          confirmButtonText: 'Fechar'
        });
      }
    });
  }
}