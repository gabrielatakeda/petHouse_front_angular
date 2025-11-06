import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Endereco } from '../../models/endereco';
import { CommonModule } from '@angular/common';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormsModule, NgModel } from '@angular/forms';
import { EnderecoService } from '../../services/endereco.service';
import { Usuarios } from '../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enderecodetails',
  imports: [RouterLink, CommonModule, MdbModalModule, FormsModule],
  templateUrl: './enderecodetails.component.html',
  styleUrl: './enderecodetails.component.scss'
})
export class EnderecodetailsComponent {

  modalService = inject(MdbModalService); //para cosneguir abrir a modal
  @ViewChild("modalEditEndereco") modalEditEndereco!: TemplateRef<any>
  modalRef!: MdbModalRef<any>;

  enderecoService = inject(EnderecoService);

  modoEndereco!: string;

  usuario!: Usuarios;

  enderecoEdit!: Endereco;

  endereco: Endereco[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras.state?.['usuario'] as Usuarios;
    this.endereco = this.usuario?.enderecos || [];

    console.log("Usuário:", this.usuario);//teste
    console.log("Endereço em edição:", this.enderecoEdit);//teste
    console.log("Endereço lista:", this.endereco);//teste

  }

  editarEndereco(endereco: Endereco, modoEndereco: string) {
    this.modoEndereco = modoEndereco;
    if (modoEndereco === 'novo') {
      this.enderecoEdit = new Endereco("", 0, "", "", "", "", { id: this.usuario.id } as Usuarios,);
    } else {
      this.enderecoEdit = { ...endereco };
    }
    console.log(this.enderecoEdit)
    this.modalRef = this.modalService.open(this.modalEditEndereco);
  }


  removerEndereco(endereco: Endereco) {
    if (!endereco.id) return;

    this.enderecoService.delete(endereco.id).subscribe({
      next: retorno => {
        this.endereco = this.endereco.filter(e => e.id !== endereco.id);
        this.modalRef.close();
        Swal.fire('Sucesso', 'Endereço deletado com sucesso!', "info");
      },
      error: erro => {
        Swal.fire('Erro', 'Erro ao deletar endereço!', 'error');
        console.log(erro);//console.log para mostrar erro dado
      }
    });
  }


  salvarEdicaoEndereco() {
    if (this.modoEndereco === 'novo') {
      this.enderecoService.save(this.enderecoEdit).subscribe({
        next: retorno => {
          this.endereco.push(retorno); // Adiciona o retorno do backend
          this.modalRef.close();
          Swal.fire('Sucesso', 'Endereço salvo com sucesso!', "success");
        },
        error: erro => {
          Swal.fire('Erro', 'Erro ao salvar um endereço!', "error");
          console.log(erro);//console.log para mostrar erro dado
        }
      });
    } else {
      this.enderecoService.update(this.enderecoEdit.id!, this.enderecoEdit).subscribe({
        next: retorno => {
          // Atualiza a lista local substituindo o endereço editado
          const index = this.endereco.findIndex(e => e.id === retorno.id);
          if (index > -1) this.endereco[index] = retorno;
          this.modalRef.close();
          Swal.fire('Sucesso', 'Endereço atialzado com sucesso!',"success");
        },
        error: erro => {
          Swal.fire('Erro', 'Erro ao atualizar endereço!', "error");
          console.log(erro);//console.log para moastrar erro dado
        }
      });
    }
  }


}
