import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CrmDetalle } from '../_model/crmDetalle';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Observable, Subject } from 'rxjs';
import { FiltroCrmDetallesDTO } from '../_dto/FiltroCrmDetallesDTO';

@Injectable({
  providedIn: 'root'
})
export class CrmDetallesService extends GenericService <CrmDetalle> {

  private crmDetalleCambio = new Subject<CrmDetalle[]>();
  private mensajeCambio = new Subject<string>();

  constructor ( protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/crmDetalles`
    ) }

    // listarCasos( parametrosDTO: ParametrosDTO ){
    //   const headers = { 'content-type': 'application/json'}
    //   console.log(parametrosDTO,'service')
    //   return this.http.post<CrmDetalle[]>(`${this.url}/casosCliente`,parametrosDTO,{'headers':headers});
    // }


    public detalleCasos(id: number) :Observable<CrmDetalle[]> {
      return this.http.get<CrmDetalle[]>(`${this.url}/detalleCasos/${id}`, {});
    }

    registrarDetalle(filtroCrmDetallesDTO: FiltroCrmDetallesDTO):Observable<FiltroCrmDetallesDTO[]>{
      const headers = { 'content-type': 'application/json'}
      return this.http.post<FiltroCrmDetallesDTO[]>(`${this.url}/registrarDetalle`,filtroCrmDetallesDTO,{'headers':headers});
    }

    ////////////////// get, set ////////////////

    getCrmDetalleCambio(){
      return this.crmDetalleCambio.asObservable();
    }
  
    setCrmDetalleCambio(crmDetalle: CrmDetalle[]){
      this.crmDetalleCambio.next(crmDetalle);
    }
  
    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajecambio(mensaje: string){
      return this.mensajeCambio.next(mensaje);
    }
  
   
}
