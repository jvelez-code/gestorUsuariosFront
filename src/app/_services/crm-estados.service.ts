import { Injectable } from '@angular/core';
import { CrmEstado } from '../_model/crmEstado';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrmEstadosService extends GenericService <CrmEstado> {

  constructor ( protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/crmEstados`
    ) }
}
