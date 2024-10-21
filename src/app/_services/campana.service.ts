import { Injectable } from '@angular/core';
import { Campana } from '../_model/campana';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanaService extends GenericService<Campana>{

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/campanas`
    );
  }

  listarAsignacion(parametrosDTO: ParametrosDTO):Observable<Campana[]>{
    const headers = { 'content-type': 'application/json'}
    return this.http.post<Campana[]>(`${this.url}/listarAsignacion`,parametrosDTO,{'headers':headers});
  }


}
