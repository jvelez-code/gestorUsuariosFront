import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { EnvioCorreo } from '../_dto/envioCorreo';

@Injectable({
  providedIn: 'root'
})
export class EnvioCorreoService {

  private url:string = `${environment.HOSTCORREO}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 

  }

  enviarCalidad(envioCorreo: EnvioCorreo) {
    const headers = { 'content-type': 'application/json'} 
    return this.http.post< string >(`${this.url}`, envioCorreo, { headers } );
  }

}
