import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuarios } from '../../models/usuario';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seguranca',
  imports: [RouterLink, CommonModule, MdbModalModule, FormsModule],
  templateUrl: './seguranca.component.html',
  styleUrl: './seguranca.component.scss'
})
export class SegurancaComponent {

  modalService = inject(MdbModalService); //para cosneguir abrir a modal
  @ViewChild("modalEditSenha") modalEditSenha!: TemplateRef<any>
  modalRef!: MdbModalRef<any>;

  usuarioService = inject(UsuarioService);

  //construção para edição de dados
  usuarioEdit: Usuarios = new Usuarios("", "", "", "", "", [])

  senhaConfirm!: string;

  usuario?: Usuarios;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras.state?.['usuario'];
  }

  editarSenha(usuario: Usuarios) {
    this.usuarioEdit = usuario;
    this.modalRef = this.modalService.open(this.modalEditSenha);
  }

  salvarEdicaoSenha() {
    if (this.usuarioEdit.senha == this.senhaConfirm) {
      if (this.usuarioEdit.id) {
        this.usuarioService.update(this.usuarioEdit.id, this.usuarioEdit).subscribe({
          next: retorno => {
            this.usuario = retorno;
            this.modalRef.close();
            Swal.fire('Sucesso', 'Nova senha salva com sucesso!', "success");
          },
          error: erro => {
            Swal.fire('Erro', 'Erro ao salvar a senha!', 'error');
            console.log(erro)//console.log para mostrar o erro dado
          }
        })
        this.modalRef.close();
      }
    } else if (this.usuarioEdit.senha != this.senhaConfirm) {
      this.modalRef.close();
      Swal.fire('Erro', 'Erro ao salvar. Por favor insira senhas iguais', 'error');
    }
  }
}
