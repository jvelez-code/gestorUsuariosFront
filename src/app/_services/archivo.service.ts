import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Archivo } from '../_model/archivo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService extends GenericService<Archivo>{

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/archivos`
    );
  }

}
