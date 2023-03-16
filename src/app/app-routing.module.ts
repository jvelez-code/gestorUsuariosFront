import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntranteComponent } from './pages/filtro-cliente/entrante/entrante.component';
import { FiltroClienteComponent } from './pages/filtro-cliente/filtro-cliente.component';
import { FiltroSalienteComponent } from './pages/filtro-saliente/filtro-saliente.component';
import { FiltroSecretariaComponent } from './pages/filtro-secretaria/filtro-secretaria.component';
import { LoginComponent } from './pages/login/login.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';

const routes: Routes = [
  { path: 'filtroCliente', component: FiltroClienteComponent, children:[
    { path: 'entrante', component: EntranteComponent }
  ] },
  { path: 'filtroSaliente', component: FiltroSalienteComponent },
  { path: 'filtroSecretaria', component: FiltroSecretariaComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
