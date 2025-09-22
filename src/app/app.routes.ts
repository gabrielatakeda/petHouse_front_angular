import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/design/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: "", pathMatch:'full', redirectTo: "login" },
    {path: "login", component: LoginComponent},
];
