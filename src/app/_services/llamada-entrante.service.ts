import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AskEstadoExtension } from '../_model/askEstadoExtension';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Observable } from 'rxjs';

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

    LlamadaEntrante(parametrosDTO :ParametrosDTO) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<boolean>(`${this.url}/llamadaEntrante`,body,{'headers':headers});

    }


    asteriskCliente(parametrosDTO: ParametrosDTO):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<ParametrosDTO>(`${this.url}/buscarAsterisk`,body,{'headers':headers});
    }

    usuarioTmo(parametrosDTO: ParametrosDTO):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<ParametrosDTO>(`${this.url}/tmoUsuario`,body,{'headers':headers});
    }
  }
