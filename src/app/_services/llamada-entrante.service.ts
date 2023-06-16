import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AskEstadoExtension } from '../_model/askEstadoExtension';

@Injectable({
  providedIn: 'root'
})
export class LlamadaEntranteService {

  private url:string = `${environment.HOST}/LlamadasEntrantes`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }


    buscarLogin(askEstadoExtension :AskEstadoExtension) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(askEstadoExtension);
      return this.http.post<boolean>(`${this.url}/buscarAsterisk`,body,{'headers':headers});

    }

    buscarLlamada(askEstadoExtension :AskEstadoExtension) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(askEstadoExtension);
      return this.http.post<boolean>(`${this.url}/buscarLlamada`,body,{'headers':headers});

    }
}
