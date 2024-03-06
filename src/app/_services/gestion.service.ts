import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gestion } from '../_model/gestion';
import { Parametros } from '../_model/parametros';
import { CantidadGestionDTO } from '../_dto/CantidadGestionDTO ';
import { ParametrosDTO } from '../_dto/ParametrosDTO';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private url:string = `${environment.HOST}/gestiones`;
  private gestionCambio = new Subject<CantidadGestionDTO[]>();
  private idGestionSaliente = new BehaviorSubject<Number> (0);

  constructor(
    protected http: HttpClient,
    protected router: Router ) {
      // super (
      //   http,`${environment.HOST}/gestiones`
      // );
     }

    gestionHistoricoS(parametros: Parametros):Observable<any>{
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros>(`${this.url}/buscar`, body, headers);
    }

    guardarGestionS(gestion: Gestion):Observable<any>{
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(gestion);
      return this.http.post<Gestion>(`${this.url}`, body, headers);
    }

    guardarGestionComercial(gestion: Gestion) {
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(gestion);
      return this.http.post<Gestion>(`${this.url}/comercial`, body, headers);
    }

    buscarGestionSaliente(parametrosDTO: ParametrosDTO) :Observable<any> {
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<ParametrosDTO>(`${this.url}/saliente`, body, headers);
    }

    actulizaGestionSaliente(gestion: Gestion) {1
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(gestion);
      return this.http.put<Gestion>(`${this.url}/comercial`, body, headers);
    }

    salienteGestion(id: number , gestion: Gestion) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(gestion);
      return this.http.patch<Gestion>(`${this.url}/${id}`,body,{'headers':headers});
    }




    //////// get, set ///////////////////

    getGestionCambio(){
      return this.gestionCambio.asObservable();
    }
  
    setGestionCambio(gestion: CantidadGestionDTO[]){
      return this.gestionCambio.next(gestion);
    }

    setIdGestionSaliente(idGestion: number){
      return this.idGestionSaliente.next(idGestion);
    }

    getIdGestionSaliente(){
      return this.idGestionSaliente.asObservable();
    }
  
}
