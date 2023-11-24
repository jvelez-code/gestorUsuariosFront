import { Injectable } from '@angular/core';
import { CicloVida } from '../_model/cicloVida';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { GestionComercialDto } from '../_dto/GestionComercialDto';

@Injectable({
  providedIn: 'root'
})
export class CicloVidaService extends GenericService<CicloVida>{

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/cicloDeVidas`
    );
  }


  modificarCiclo(parametrosDTO: ParametrosDTO) {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametrosDTO);
    return this.http.post<GestionComercialDto>(`${this.url}/modificar`,body,{'headers':headers});
  }
}
