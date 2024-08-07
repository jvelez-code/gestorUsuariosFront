import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametros } from '../_model/parametros';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { EstadoGestion } from '../_model/estadoGestion';

@Injectable({
  providedIn: 'root'
})
export class EstadoGestionService {

  private url:string = `${environment.HOST}/estadoGestiones`;

  constructor(
    private http: HttpClient,
    private router: Router) { }

    estadoGestionPadre(parametros: Parametros) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<EstadoGestion[]>(`${this.url}/buscar`,body,{'headers':headers});
    }

    estadoGestionHijo(parametros: Parametros):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros>(`${this.url}/buscarEstado`,body,{'headers':headers});
    }

    estadoComercial(parametros: ParametrosDTO):Observable<EstadoGestion[]>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<EstadoGestion[]>(`${this.url}/gestionComercial`,body,{'headers':headers});
    }

    estadoSecretaria(parametros: ParametrosDTO):Observable<EstadoGestion[]>{
      const headers = { 'content-type': 'application/json'} 
      return this.http.post<EstadoGestion[]>(`${this.url}/estadoSecretaria`,parametros,{'headers':headers});
    }
}
