import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userdetails',
  imports: [RouterLink, CommonModule, MdbModalModule, FormsModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent {

  edit!: string;

  usuarioEdit: Usuario = new Usuario(0, "", "", "", "", [])

  modalService = inject(MdbModalService); //para cosneguir abrir a modal
  @ViewChild("modalEditdetails") modalEditdetails!: TemplateRef<any>
  modalRef!: MdbModalRef<any>;

  usuarioService = inject(UsuarioService);

  usuario?: Usuario;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras.state?.['usuario'];
  }

  editarDetails(usuario: Usuario, edit: string) {
    this.edit = edit;
    this.usuarioEdit = usuario;
    this.modalRef = this.modalService.open(this.modalEditdetails);
  }

  salvarEdicaoDatails() {

    this.usuarioService.update(this.usuarioEdit.id, this.usuarioEdit).subscribe({
      next: retorno => {
        this.usuario = retorno;
      },
      error: erro => {
        alert("erro ao salvar dados do usuário");
      }
    })
    this.modalRef.close();
  }

}
