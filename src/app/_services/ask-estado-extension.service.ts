import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FiltroEstadoDTO } from '../_dto/filtroEstdoDTO ';
import { AskEstadoExtension } from '../_model/askEstadoExtension';

@Injectable({
  providedIn: 'root'
})
export class AskEstadoExtensionService {

  private url:string = `${environment.HOST}/askEstadoExtensiones`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }

    

    buscarAgente(askEstadoExtension :AskEstadoExtension) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(askEstadoExtension);
      return this.http.post<AskEstadoExtension>(`${this.url}/buscar`,body,{'headers':headers});

    }

    buscarxAgentes(askEstadoExtension :AskEstadoExtension) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(askEstadoExtension);
      return this.http.post<AskEstadoExtension>(`${this.url}/buscaraAgente`,body,{'headers':headers});

    }

    actualizarEstadoExt(filtroEstadoDTO :FiltroEstadoDTO) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(filtroEstadoDTO);
      return this.http.post<FiltroEstadoDTO>(`${this.url}/actualizarEstado`,body,{'headers':headers});
  
    }



  }

