import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EntrantesComponent } from './pages/entrantes/entrantes.component';
import { ExtadoExtComponent } from './pages/estado-ext/estado-ext.component';
import { FiltroClienteComponent } from './pages/filtro-cliente/filtro-cliente.component';
import { FiltroSalienteComponent } from './pages/filtro-saliente/filtro-saliente.component';
import { FiltroSecretariaComponent } from './pages/filtro-secretaria/filtro-secretaria.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { GuardService } from './_services/guard.service';
import { CambiarEmpresaComponent } from './pages/cambiar-empresa/cambiar-empresa.component';

const routes: Routes = [
  { path: 'filtroEntrante', component: FiltroClienteComponent, children:[
    { path: 'entrante', component: FiltroClienteComponent }
  ]
 },
  { path: 'gestionEntrante', component: EntrantesComponent },
  { path: 'filtroSaliente', component: FiltroSalienteComponent ,canActivate: [GuardService] },
  { path: 'secretariaVirtual', component: FiltroSecretariaComponent, canActivate: [GuardService] },
  { path: 'estadoExtension', component: ExtadoExtComponent, canActivate: [GuardService] },
  { path: 'clientes', component: ClientesComponent },
  { path: 'usuarioEmpresa', component: CambiarEmpresaComponent },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
