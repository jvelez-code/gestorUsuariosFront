import { Injectable } from '@angular/core';
import { Campana } from '../_model/campana';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

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


}
