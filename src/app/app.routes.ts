import { Routes } from '@angular/router'; //É usado para definir as rotas da aplicação
import { RegistroComponent } from './components/registro/registro.component'; //Importa o componente que será exibido quando a rota correspondente for acessada

export const routes: Routes = [

    /*Rota padrão (quando o caminho for vazio "")
    'pathMatch: full' garante que só redireciona se o caminho for exatamente vazio
    'redirectTo: "registro"' redireciona o usuário automaticamente para a rota '/registro'*/
    {path: "", pathMatch:'full', redirectTo: "registro" },

    /*Rota que mapeia '/registro' para o componente RegistroComponent
    Ou seja, quando o usuário acessa localhost:4200/registro,
    o Angular renderiza o RegistroComponent*/
    {path: "registro", component: RegistroComponent}
];