import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../_model/tipoDocumento';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService extends GenericService <TipoDocumento> {

 // private url:string = `${environment.HOST}/tipoDocumentos`;

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/tipoDocumentos`
    );
  }

    buscar(){
      return this.http.get<TipoDocumento[]>(`${this.url}`);
    }
}
