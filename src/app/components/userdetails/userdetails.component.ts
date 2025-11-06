import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { Usuarios } from '../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userdetails',
  imports: [RouterLink, CommonModule, MdbModalModule, FormsModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent {

  edit!: string;

  usuarioEdit: Usuarios = new Usuarios("", "", "", "", "",new Date, [])

  modalService = inject(MdbModalService); //para cosneguir abrir a modal
  @ViewChild("modalEditdetails") modalEditdetails!: TemplateRef<any>
  modalRef!: MdbModalRef<any>;

  usuarioService = inject(UsuarioService);

  usuario?: Usuarios;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras.state?.['usuario'];
  }

  editarDetails(usuario: Usuarios, edit: string) {
    this.edit = edit;
    this.usuarioEdit = usuario;
    this.modalRef = this.modalService.open(this.modalEditdetails);
  }

  salvarEdicaoDatails() {
    if (this.usuarioEdit.id) {
      this.usuarioService.update(this.usuarioEdit.id, this.usuarioEdit).subscribe({
      next: retorno => {
        this.usuario = retorno;
        this.modalRef.close;
        Swal.fire("Sucesso", "Informações salvas com sucesso!", "success");
      },
      error: erro => {
        Swal.fire("Erro", "Erro ao atualizar infromações", "error");
        console.log(erro);//console.log para mostrar erro dado
      }
    })
    this.modalRef.close();
    }
    
  }

}
