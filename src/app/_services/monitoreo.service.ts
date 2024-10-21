import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AskEstadoExtension } from '../_model/askEstadoExtension';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {

  parametrosDTO !: ParametrosDTO;
  
  


private url:string = `${environment.HOSTNODE}`;


constructor( private http: HttpClient ) 
{ }

listarMonitoreo(){
  return this.http.get<AskEstadoExtension[]>(`${this.url}/monitoreo`);
}


monitoreoEmpresa( parametrosDTO: ParametrosDTO ):Observable<AskEstadoExtension[]>{
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(parametrosDTO);
  return this.http.post<AskEstadoExtension[]>(`${this.url}/reporContact/monitoreo`,body,{'headers':headers});
 }
}