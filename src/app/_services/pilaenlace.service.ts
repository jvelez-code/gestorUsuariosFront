import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planillas } from '../_model/planillas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PilaenlaceService {

  private token !: String;

  constructor(private http: HttpClient) { 
    this.buscarToken();
  }

  buscarToken(){
    const header = { 'content-type': 'application/json'}  
    const parametros= { 'usuario': 'VFB6d2dGdjgyZVE0dlZ4eHVxY2hidz09',
    'clave': 'Y1hyRnZXaTBzV2dtOHBmaFpMNnhPUT09',
    'token': '',
    'error': 0 }
    const body=JSON.stringify(parametros);
    this.http.post('https://prbtsoa.enlace-apb.com/sinapsis-api/services/authorize',body,{'headers':header}).subscribe( (data:any) =>{
         
    this.token=data.token;      
    });
  }

  buscarPlanilla(tipo: string, docu: string, anio: string, mes: string):Observable<Planillas[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
    if (!this.token){
    }
    return this.http.get<Planillas[]>(`https://prbusr.enlace-apb.com/sinapsis-api/services/getPlanillasIndependientes/${tipo}/${docu}/${anio}-${mes}`,{ headers });  
  }




}
