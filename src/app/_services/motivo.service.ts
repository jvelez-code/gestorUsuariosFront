import { Injectable } from '@angular/core';
import { Motivo } from '../_model/motivoComercial';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotivoService extends GenericService<Motivo>{

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/motivos`
    );
  }
}
