import { Injectable } from '@angular/core';
import { CrmCategoria } from '../_model/crmCategoria';
import { GenericService } from './generic.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { FiltroCrmDetallesDTO } from '../_dto/FiltroCrmDetallesDTO';

@Injectable({
  providedIn: 'root'
})
export class CrmCategoriaService extends GenericService <CrmCategoria> {

  private crmCategoriaCambio = new Subject<CrmCategoria[]>();
  private mensajeCambio = new Subject<string>();

  constructor ( protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/crmCategorias`
    ) }

}
