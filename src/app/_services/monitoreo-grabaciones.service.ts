import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { MonitoreoGrabaciones } from '../_model/monitoreoGrabaciones';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoGrabacionesService extends GenericService <MonitoreoGrabaciones> {

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/MonitoreoGrabaciones`
    );
  }
}
