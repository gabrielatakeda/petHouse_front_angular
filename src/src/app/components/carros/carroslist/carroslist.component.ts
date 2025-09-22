import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from '../carrosdetails/carrosdetails.component';
import { CarroService } from '../../../../services/carro.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-carroslist',
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];

  carroEdit: Carro = new Carro(0, "")

  //ELEMENTOS DE MODAIS
  modalService = inject(MdbModalService); //para cosneguir abrir a modal
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>
  modalRef!: MdbModalRef<any>;

  carroSerice = inject(CarroService);

  constructor() {

    this.findAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroNovo) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }

    if (carroEditado) {
      let indice = this.lista.findIndex(x => { return x.id == carroEditado.id });
      this.lista[indice] = carroEditado;
    }

  }

  findAll() {

    this.carroSerice.findAll().subscribe({
      next: lista => { //quando o back retorna um valor valido
        this.lista = lista;
      },
      error: error => { //quando acontecer um erro como bad request ou exeption
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    });

  }

  deleteById(carro: Carro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletareste registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {


        this.carroSerice.delete(carro.id).subscribe({
          next: lista => { //quando o back retorna um valor valido
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            })
            this.findAll();
          },
          error: error => { //quando acontecer um erro como bad request ou exeption
            Swal.fire({
              title: 'Ocorreu um erro!',
              icon: 'error',
              confirmButtonText: 'Ok',
            })
          }
        });


      }
    });
  }

  new() {
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro) {
    this.carroEdit = carro;
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);

  }

  retornoDetalhe(carro: Carro) {
    this.findAll();
    this.modalRef.close();
  }

}
