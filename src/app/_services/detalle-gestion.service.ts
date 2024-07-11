import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Parametros } from '../_model/parametros';
import { CantidadGestionDTO } from '../_dto/CantidadGestionDTO ';
import { AskEstadoExtension } from '../_model/askEstadoExtension';
import { DetalleGestion } from '../_model/detalleGestion';
import { GenericService } from './generic.service';
import { FiltroDetalleGestionDTO } from '../_dto/filtroDetalleGestionDTO';

@Injectable({
  providedIn: 'root'
})
export class DetalleGestionService extends GenericService<DetalleGestion> {

  private mensajeCambio = new Subject<string>();

  
  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/detallegestiones`
    )
  }



    detalleHistorico(parametrosDTO: ParametrosDTO):Observable<FiltroDetalleGestionDTO[]>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<FiltroDetalleGestionDTO[]>(`${this.url}/detalleHistorico`,body,{'headers':headers});
    }

    cantidadGestion(askEstadoExtension: AskEstadoExtension){
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(askEstadoExtension);
      return this.http.post<CantidadGestionDTO[]>(`${this.url}/catidadGestion`,body,{'headers':headers});
    }

    salienteDetalle(getalleGestion: DetalleGestion){
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(getalleGestion);
      return this.http.post<DetalleGestion>(`${this.url}`,body,{'headers':headers});
    }

    guardarSaliente(id :number, detalleGestion: DetalleGestion){
      const headers = { 'content-type': 'application/json'}  
      
      const body=JSON.stringify(detalleGestion);
      return this.http.post<DetalleGestion>(`${this.url}/gestionSaliente/${id}`,body,{'headers':headers});

    }



    //////// GET , SET ///////////////////

    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajecambio(mensaje: string){
      return this.mensajeCambio.next(mensaje);
    }
}
