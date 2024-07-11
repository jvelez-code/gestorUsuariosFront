import { Routes } from '@angular/router';
import { FiltroClienteComponent } from './pages/filtro-cliente/filtro-cliente.component';
import { EntrantesComponent } from './pages/entrantes/entrantes.component';
import { SalienteComponent } from './pages/saliente/saliente.component';
import { FiltroSalienteComponent } from './pages/filtro-saliente/filtro-saliente.component';
import { FiltroSecretariaComponent } from './pages/filtro-secretaria/filtro-secretaria.component';
import { ExtadoExtComponent } from './pages/estado-ext/estado-ext.component';
import { MonitoreosComponent } from './pages/monitoreo/monitoreos.component';
import { GuardService } from './_services/guard.service';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CambiarEmpresaComponent } from './pages/cambiar-empresa/cambiar-empresa.component';
import { GestionComercialComponent } from './pages/gestion-comercial/gestion-comercial.component';
import { SecretariaVirtualComponent } from './pages/secretaria-virtual/secretaria-virtual.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { UsuarioEdicionComponent } from './pages/gestion-usuarios/usuario-edicion/usuario-edicion.component';
import { ProductividadComponent } from './pages/productividad/productividad.component';
import { ExtensionesComponent } from './pages/extensiones/extensiones.component';
import { FidelizacionComponent } from './pages/fidelizacion/fidelizacion.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { LoginComponent } from './pages/login/login.component';
import { CrmCuentasComponent } from './pages/crm-cuentas/crm-cuentas.component';
import { CrmAbiertosComponent } from './pages/crm-abiertos/crm-abiertos.component';
import { CasoNuevoComponent } from './pages/crm-cuentas/caso-nuevo/caso-nuevo.component';


export const routes: Routes = [
  { path: 'filtroEntrante', component: FiltroClienteComponent, children:[
    { path: 'entrante', component: FiltroClienteComponent }
  ]
 },
  { path: 'gestionEntrante', component: EntrantesComponent },
  { path: 'gestionSaliente', component: SalienteComponent },
  { path: 'filtroSaliente', component: FiltroSalienteComponent },
  { path: 'filtrosecretaria', component: FiltroSecretariaComponent, canActivate: [GuardService] },
  { path: 'estadoExtension', component: ExtadoExtComponent },
  { path: 'clientes', component: ClientesComponent, canActivate: [GuardService] },
  { path: 'usuarioEmpresa', component: CambiarEmpresaComponent , canActivate: [GuardService]},
  { path: 'gestionComercial', component: GestionComercialComponent },
  { path: 'secretariaVirtual', component: SecretariaVirtualComponent },
  { path: 'gestionUsuarios', component: GestionUsuariosComponent, children:[
    { path: 'nuevo', component: UsuarioEdicionComponent },
    { path: 'edicion/:id', component: UsuarioEdicionComponent },
    ] 
  },
  { path: 'productividad', component: ProductividadComponent },
  { path: 'extensiones', component: ExtensionesComponent , canActivate: [GuardService]},
  { path: 'fidelizacion', component: FidelizacionComponent },
  { path: 'monitoreo', component: MonitoreosComponent },
  { path: 'crmCuentas', component: CrmCuentasComponent },//CrmCuentasComponent CasoNuevoComponent
  { path: 'crmCasos', component: CrmAbiertosComponent },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
    
];