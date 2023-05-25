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
    EntrantesComponent
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