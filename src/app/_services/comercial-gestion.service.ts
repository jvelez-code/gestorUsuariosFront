import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { GestionComercialDto } from '../_dto/GestionComercialDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';

@Injectable({
  providedIn: 'root'
})
export class ComercialGestionService extends GenericService<GestionComercialDto> {

  
  constructor(protected override  http: HttpClient) {
    super(
      http,
      `${environment.HOST}/gestionesComerciales`
    )
  }

  gestionComercial(parametrosDTO: ParametrosDTO) {
    const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
    const body=JSON.stringify(parametrosDTO);
    return this.http.post<GestionComercialDto[]>(`${this.url}/gestionComercial`, body, headers);
  }

}
