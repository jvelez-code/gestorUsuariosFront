import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltroClienteComponent } from './pages/filtro-cliente/filtro-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { EntranteComponent } from './pages/filtro-cliente/entrante/entrante.component';
import { EdicionEntranteComponent } from './pages/filtro-cliente/entrante/edicion-entrante/edicion-entrante.component';
import { FiltroSalienteComponent } from './pages/filtro-saliente/filtro-saliente.component';
import { FiltroSecretariaComponent } from './pages/filtro-secretaria/filtro-secretaria.component';


@NgModule({
  declarations: [
    AppComponent,
    FiltroClienteComponent,
    LoginComponent,
    EntranteComponent,
    EdicionEntranteComponent,
    FiltroSalienteComponent,
    FiltroSecretariaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
