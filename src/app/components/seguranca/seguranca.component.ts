import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seguranca',
  imports: [RouterLink, CommonModule],
  templateUrl: './seguranca.component.html',
  styleUrl: './seguranca.component.scss'
})
export class SegurancaComponent {

  usuario?: Usuario;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras.state?.['usuario'];
  }
}
