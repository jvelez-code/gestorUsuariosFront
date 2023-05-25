import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiltroEntranteDTO } from '../_dto/filtroEntranteDTO';
import { Parametros } from '../_model/parametros';

@Injectable({
  providedIn: 'root'
})
export class DetalleGestionService {

  private url:string = `${environment.HOST}/detallegestiones`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }


    detalleHistoricoS(filtroEntranteDTO: FiltroEntranteDTO):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(filtroEntranteDTO);
      return this.http.post<FiltroEntranteDTO[]>(`${this.url}/buscarCliente`,body,{'headers':headers});
    }
}
