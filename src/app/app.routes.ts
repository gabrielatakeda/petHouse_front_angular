import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/design/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CarrinhoComponent } from './components/pages/carrinho/carrinho.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { ProductFormComponent } from './components/pages/cadastro-produto/cadastro-produto.component';

export const routes: Routes = [
    {path: "", pathMatch:'full', redirectTo: "login" },
    {path: "login", component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'carrinho', component: CarrinhoComponent},
    {path: "registro", component: RegistroComponent},
    {path: "cadastroProduto", component: ProductFormComponent}
];
