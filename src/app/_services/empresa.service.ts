import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Empresa } from '../_model/empresa';
import { GenericService } from './generic.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends GenericService<Empresa>{

  private empresaCambio = new BehaviorSubject<string>('');
  private mensajeCambio = new Subject<string>();
  
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/empresas`
    );
  }

  modificarEmp(parametrosDTO: ParametrosDTO) {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametrosDTO);
    return this.http.post<ParametrosDTO>(`${this.url}/modificar`,body,{'headers':headers});
  }
    ////////////////// get, set ////////////////

    getEmpresaCambio(){
      console.log('recibo')
      return this.empresaCambio.asObservable();

    }
  
    setEmpresaCambio(empresas: string){
      this.empresaCambio.next(empresas);
    }
  
    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajecambio(mensaje: string){
      return this.mensajeCambio.next(mensaje);
    }

}
