import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltroClienteComponent } from './pages/filtro-cliente/filtro-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FiltroSalienteComponent } from './pages/filtro-saliente/filtro-saliente.component';
import { FiltroSecretariaComponent } from './pages/filtro-secretaria/filtro-secretaria.component';
import { environment } from 'src/environments/environment';
import { JwtModule } from "@auth0/angular-jwt";
import { ExtadoExtComponent } from './pages/estado-ext/estado-ext.component';
import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';
import { EntrantesComponent } from './pages/entrantes/entrantes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { ClienteDialogoComponent } from './pages/entrantes/cliente-dialogo/cliente-dialogo.component';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CambiarEmpresaComponent } from './pages/cambiar-empresa/cambiar-empresa.component';
import { GestionComercialComponent } from './pages/gestion-comercial/gestion-comercial.component';
import { SecretariaVirtualComponent } from './pages/secretaria-virtual/secretaria-virtual.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { ProductividadComponent } from './pages/productividad/productividad.component';
import { ExtensionesComponent } from './pages/extensiones/extensiones.component';
import { UsuarioEdicionComponent } from './pages/gestion-usuarios/usuario-edicion/usuario-edicion.component';
import { RouterModule } from '@angular/router';
import { FidelizacionComponent } from './pages/fidelizacion/fidelizacion.component';
import { FidelizacionUsuComponent } from './pages/gestion-comercial/fidelizacion-usu/fidelizacion-usu.component';
import { CicloVidaComponent } from './pages/gestion-comercial/ciclo-vida/ciclo-vida.component';
import { Not404Component } from './pages/not404/not404.component';
import { Not403Component } from './pages/not403/not403.component';
import { SalienteComponent } from './pages/saliente/saliente.component';
import { ClienteDialSalComponent } from './pages/saliente/cliente-dial-sal/cliente-dial-sal.component';


export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    FiltroClienteComponent,
    LoginComponent,
    FiltroSalienteComponent,
    FiltroSecretariaComponent,
    ExtadoExtComponent,
    EntrantesComponent,
    ClientesComponent,
    RecuperarComponent,
    TokenComponent,
    ClienteDialogoComponent,
    CambiarEmpresaComponent,
    GestionComercialComponent,
    SecretariaVirtualComponent,
    GestionUsuariosComponent,
    ProductividadComponent,
    ExtensionesComponent,
    UsuarioEdicionComponent,
    FidelizacionComponent,
    FidelizacionUsuComponent,
    CicloVidaComponent,
    Not404Component,
    Not403Component,
    SalienteComponent,
    ClienteDialSalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //allowedDomains: ["10.1.0.231:9898"],
        allowedDomains: [environment.HOST.substring(7)],
        disallowedRoutes: [`http://${environment.HOST.substring(7)}/login/enviarCorreo`],
      },
    }),
    NgHcaptchaModule.forRoot(      {
        siteKey: '53b9bb7e-49a4-428f-ab81-5935daec8a8a',
        languageCode: 'es', 
        //theme: 'dark' // añade esta opción para el tema oscuro
      }
    )
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
    { provide: LocationStrategy , useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }