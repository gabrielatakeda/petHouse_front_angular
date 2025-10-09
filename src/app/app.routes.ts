import { Routes } from '@angular/router';
import { LoginComponent } from './components/design/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CarrinhoComponent } from './components/pages/carrinho/carrinho.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { ProductFormComponent } from './components/pages/cadastro-produto/cadastro-produto.component';
import { ProdutoDetailsComponent } from './components/pages/produto-details/produto-details.component';
import { MainComponent } from './components/design/main/main.component';

export const routes: Routes = [
    

    {path: "", pathMatch:'full', redirectTo: "login" },
    {path: "login", component: LoginComponent},
    {
        path: "principal",
        component: MainComponent, 
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'carrinho', component: CarrinhoComponent},
            {path: "registro", component: RegistroComponent},
            {path: "cadastroProduto", component: ProductFormComponent},
            {path: "produtoDetails/:id", component: ProdutoDetailsComponent}
        ]
    },
        
];
