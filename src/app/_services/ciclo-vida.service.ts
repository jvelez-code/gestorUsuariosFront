import { Injectable } from '@angular/core';
import { CicloVida } from '../_model/cicloVida';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';

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
}
