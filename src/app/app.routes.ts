import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/design/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { RegistroComponent } from './components/design/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { EnderecodetailsComponent } from './components/enderecodetails/enderecodetails.component';
import { SegurancaComponent } from './components/seguranca/seguranca.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: '**', redirectTo: '' },
    { path: 'usuario', component: UsuariosComponent },
    { path: 'usuario/details', component: UserdetailsComponent },
    { path: 'usuario/adress', component: EnderecodetailsComponent },
    { path: 'usuario/security', component: SegurancaComponent },
    {path: "login", component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'carrinho', component: CarrinhoComponent},
    {path: "registro", component: RegistroComponent}
];

