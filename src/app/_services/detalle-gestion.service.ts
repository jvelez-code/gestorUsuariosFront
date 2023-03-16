import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametros } from '../_model/parametros';

@Injectable({
  providedIn: 'root'
})
export class DetalleGestionService {

  private url:string = `${environment.HOST}/detallegestiones`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }


    detalleHistoricoS(parametros: Parametros):Observable<any>{
      console.log('paramedetalle',parametros)  
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros[]>(`${this.url}/buscar`,body,{'headers':headers});
    }
}
