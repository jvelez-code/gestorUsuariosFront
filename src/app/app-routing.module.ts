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
//import { Not403Component } from './pages/not403/not403.component';
//import { Not404Component } from './pages/not404/not404.component';
import { GuardService } from './_services/guard.service';
import { CambiarEmpresaComponent } from './pages/cambiar-empresa/cambiar-empresa.component';
import { GestionComercialComponent } from './pages/gestion-comercial/gestion-comercial.component';
import { SecretariaVirtualComponent } from './pages/secretaria-virtual/secretaria-virtual.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { ProductividadComponent } from './pages/productividad/productividad.component';
import { ExtensionesComponent } from './pages/extensiones/extensiones.component';
import { UsuarioEdicionComponent } from './pages/gestion-usuarios/usuario-edicion/usuario-edicion.component';
import { FidelizacionComponent } from './pages/fidelizacion/fidelizacion.component';
import { CicloVidaComponent } from './pages/gestion-comercial/ciclo-vida/ciclo-vida.component';
import { FidelizacionUsuComponent } from './pages/gestion-comercial/fidelizacion-usu/fidelizacion-usu.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { SalienteComponent } from './pages/saliente/saliente.component';
import { SalientesComponent } from './pages/salientes/salientes.component';

const routes: Routes = [
  { path: 'filtroEntrante', component: FiltroClienteComponent, children:[
    { path: 'entrante', component: FiltroClienteComponent }
  ]
 },
  { path: 'gestionEntrante', component: EntrantesComponent },
  { path: 'gestionSaliente', component: SalientesComponent },
  { path: 'filtroSaliente', component: FiltroSalienteComponent },
  { path: 'filtrosecretaria', component: FiltroSecretariaComponent, canActivate: [GuardService] },
  { path: 'estadoExtension', component: ExtadoExtComponent },
  { path: 'clientes', component: ClientesComponent, canActivate: [GuardService] },
  { path: 'usuarioEmpresa', component: CambiarEmpresaComponent , canActivate: [GuardService]},
  { path: 'gestionComercial', component: GestionComercialComponent },
  { path: 'secretariaVirtual', component: SecretariaVirtualComponent},
  { path: 'gestionUsuarios', component: GestionUsuariosComponent, children:[
    { path: 'nuevo', component: UsuarioEdicionComponent },
    { path: 'edicion/:id', component: UsuarioEdicionComponent },
    ] 
  },
  { path: 'productividad', component: ProductividadComponent },
  { path: 'extensiones', component: ExtensionesComponent , canActivate: [GuardService]},
  { path: 'fidelizacion', component: FidelizacionComponent },
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
