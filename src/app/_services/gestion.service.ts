import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gestion } from '../_model/gestion';
import { Parametros } from '../_model/parametros';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private url:string = `${environment.HOST}/gestiones`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }

    gestionHistoricoS(parametros: Parametros):Observable<any>{
      console.log('paramedetalle1',parametros)  
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(parametros);
      console.log('paramedetalle2', body)  
      return this.http.post<Parametros>(`${this.url}/buscar`, body, headers);
    }

    guardarGestionS(gestion: Gestion):Observable<any>{
      console.log('paramedetalle1',gestion)  
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(gestion);
      console.log('parame Gestion', body)  
      return this.http.post<Gestion>(`${this.url}`, body, headers);
    }

}
