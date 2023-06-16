import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Parametros } from '../_model/parametros';

@Injectable({
  providedIn: 'root'
})
export class MensajeTextoService {

  private url : string = 'https://rest.inalambria.com/MtMessage';
  

  constructor(
    private http: HttpClient,
    private router: Router ) { }


    gestionHistoricoS(parametros: Parametros) {
      const username = 'trPRUEBASsg135';
      const password = 'vj11Sa';
      const headers = { headers: new HttpHeaders({ 
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json' }) };  
      const body=JSON.stringify(parametros);
      console.log(body,'mss');
      return this.http.post<Parametros>(this.url, body, headers);
    }

}
