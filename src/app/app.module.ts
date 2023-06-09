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
    ClienteDialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }