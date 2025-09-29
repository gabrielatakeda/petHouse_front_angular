import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/design/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { RegistroComponent } from './components/design/registro/registro.component';

export const routes: Routes = [
    {path: "", pathMatch:'full', redirectTo: "login" },
    {path: "login", component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'carrinho', component: CarrinhoComponent},
    {path: "registro", component: RegistroComponent}

];
