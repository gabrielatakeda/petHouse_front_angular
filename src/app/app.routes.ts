import { Routes } from '@angular/router';
import { LoginComponent } from './components/design/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CarrinhoComponent } from './components/pages/carrinho/carrinho.component';
import { ProdutoDetailsComponent } from './components/pages/produto-details/produto-details.component';
import { MainComponent } from './components/design/main/main.component';
import { ForgotComponent } from './components/design/forgot/forgot.component';
import { PrincipalAdminComponent } from './components/pages/admin/principal-admin/principal-admin.component';
import { RoleGuard } from './services/role-guard.service';
import { CadastroProdutoComponent } from './components/pages/cadastro-produto/cadastro-produto.component';
import { DashboardComponent } from './components/pages/admin/dashboard/dashboard.component';
import { CadastroCategoriaComponent } from './components/pages/cadastro-categoria/cadastro-categoria.component';

export const routes: Routes = [


    { path: "", pathMatch: 'full', redirectTo: "login" },
    { path: "forgot", component: ForgotComponent },
    { path: "login", component: LoginComponent },
    {
        path: "principal",
        component: MainComponent,
        canActivate: [RoleGuard],
        data: { role: 'user' },
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'carrinho', component: CarrinhoComponent },
            { path: "produtoDetails/:id", component: ProdutoDetailsComponent }
        ]
    },

    // rotas do admin
    {
        path: 'principalAdmin',
        component: PrincipalAdminComponent,
        canActivate: [RoleGuard],
        data: { role: 'admin' },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {path: 'dashboard', component: DashboardComponent},
            {path: 'cadastroProdutos', component: CadastroProdutoComponent },
            {path: 'cadastroCategorias', component: CadastroCategoriaComponent}
        ]
    }
];