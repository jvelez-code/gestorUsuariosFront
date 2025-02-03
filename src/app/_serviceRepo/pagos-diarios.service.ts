import { Injectable } from '@angular/core';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PagosDiarios } from '../_model/pagoDiario';
import { Observable } from 'rxjs';
import { Parametros } from '../_model/parametros';

@Injectable({
  providedIn: 'root'
})
export class PagosDiariosService {

  parametrosDTO !: ParametrosDTO;
  private url:string = `${environment.HOSTNODE}/reporMongo`;

  constructor( private http: HttpClient ) { }

  listarPagos() :Observable <PagosDiarios[]> {
    return this.http.get<PagosDiarios[]>(`${this.url}`);
  }

  listarComercial(parametros: Parametros) :Observable <PagosDiarios[]> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.post<PagosDiarios[]>(`${this.url}/comercial` ,parametros ,{'headers':headers});
  }
}
