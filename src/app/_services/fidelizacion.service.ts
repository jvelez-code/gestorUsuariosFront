import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { FidelizacionComercial } from '../_model/fidelizacionComercial';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';

@Injectable({
  providedIn: 'root'
})
export class FidelizacionService extends GenericService<FidelizacionComercial> {


  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/fidelizacionComerciales`
    );
  }

  buscar(parametrosDTO : ParametrosDTO) {
    const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
    const body=JSON.stringify(parametrosDTO);
    return this.http.post<FidelizacionComercial[]>(`${this.url}/buscar`, body, headers);
  }
}
