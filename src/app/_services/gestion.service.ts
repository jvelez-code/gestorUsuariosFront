import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gestion } from '../_model/gestion';
import { Parametros } from '../_model/parametros';
import { CantidadGestionDTO } from '../_dto/CantidadGestionDTO ';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private url:string = `${environment.HOST}/gestiones`;
  private gestionCambio = new Subject<CantidadGestionDTO[]>();

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
      console.log(body);
      return this.http.post<Gestion>(`${this.url}`, body, headers);
    }

    //////// get, set ///////////////////

    getGestionCambio(){
      return this.gestionCambio.asObservable();
    }
  
    setGestionCambio(gestion: CantidadGestionDTO[]){
      return this.gestionCambio.next(gestion);
    }
}
