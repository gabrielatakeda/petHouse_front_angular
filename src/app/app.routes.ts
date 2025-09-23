import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { EnderecodetailsComponent } from './components/enderecodetails/enderecodetails.component';
import { SegurancaComponent } from './components/seguranca/seguranca.component';

export const routes: Routes = [
    { path: '', redirectTo: 'usuario', pathMatch: 'full' },
    { path: 'usuario', component: UsuariosComponent },
    { path: 'usuario/details', component: UserdetailsComponent },
    { path: 'usuario/adress', component: EnderecodetailsComponent },
    { path: 'usuario/security', component: SegurancaComponent }
];