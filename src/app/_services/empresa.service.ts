import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Empresa } from '../_model/empresa';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends GenericService<Empresa>{

  private empresaCambio = new Subject<Empresa[]>();
  private mensajeCambio = new Subject<string>();

  //private url:string = `${environment.HOST}/empresas`;
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

    getPacienteCambio(){
      return this.empresaCambio.asObservable();
    }
  
    setPacienteCambio(pacientes: Empresa[]){
      this.empresaCambio.next(pacientes);
    }
  
    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajecambio(mensaje: string){
      return this.mensajeCambio.next(mensaje);
    }

}
