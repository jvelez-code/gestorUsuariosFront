import { Injectable } from '@angular/core';
import { MonitoreoPlandeaccion } from '../_model/monitoreoPlandeaccion';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoPlanService extends GenericService <MonitoreoPlandeaccion> {

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/MonitoreoPlandeacciones`
    );
  }
}
