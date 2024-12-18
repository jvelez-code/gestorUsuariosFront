import { Injectable } from '@angular/core';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PagosDiarios } from '../_model/pagoDiario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosDiariosService {

  parametrosDTO !: ParametrosDTO;
  private url:string = `${environment.HOSTNODE}/reporMongo`;

  constructor( private http: HttpClient ) { }

  listarPagos() :Observable <PagosDiarios[]> {
    return this.http.get<PagosDiarios[]>(`${this.url}/comercial`);
  }
}
