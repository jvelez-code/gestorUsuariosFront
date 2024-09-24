import { Injectable } from '@angular/core';
import { Festivos } from '../_model/festivo';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FestivosService extends GenericService<Festivos>{

  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/festivos`
    );
  }

  festivos !: Festivos[];

}
