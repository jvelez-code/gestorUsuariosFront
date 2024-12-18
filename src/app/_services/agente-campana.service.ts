import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { AgenteCampana } from '../_model/agenteCampana';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AgenteCampanaService extends GenericService<AgenteCampana> {

  
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/agenteCampanas`
    );
  }


    validarAsignacion(parametrosDTO: ParametrosDTO):Observable<AgenteCampana[]>{
      const headers = { 'content-type': 'application/json'}
      return this.http.post<AgenteCampana[]>(`${this.url}/validarAsignacion`,parametrosDTO,{'headers':headers});
    }

    asignarAgente(parametrosDTO: ParametrosDTO):Observable<void>{
      const headers = { 'content-type': 'application/json'}
      return this.http.post<void>(`${this.url}/asignarAgente`,parametrosDTO,{'headers':headers});
    }


    

    
}
