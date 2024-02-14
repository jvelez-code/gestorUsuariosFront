import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Planillas } from '../_model/planillas';
import { Observable } from 'rxjs';
import { Parametros } from '../_model/parametros';

@Injectable({
  providedIn: 'root'
})
export class PilaenlaceService {

  private token !: String;
  private tokenPla !: String;

  constructor(
    protected http: HttpClient,
    //@Inject(String) protected urlGenerarPlanilla: string
    ) { 
    this.buscarToken();
    this.tokenPlanillas();
  }

  buscarToken(){
    const header = { 'content-type': 'application/json'}  

    const parametros = { 
    'usuario': 'VFB6d2dGdjgyZVE0dlZ4eHVxY2hidz09',
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



  tokenPlanillas(){
    const header = { 'content-type': 'application/json'}  

    const parametros = { 
    'usuario': 'VFB6d2dGdjgyZVE0dlZ4eHVxY2hidz09',
    'clave': 'Y1hyRnZXaTBzV2dtOHBmaFpMNnhPUT09',
    'token': '',
    'error': 0 }

    const body=JSON.stringify(parametros);

    this.http.post('https://prbusr.enlace-apb.com/sinapsis-api/services/authorize/',body,{'headers':header}).subscribe( (data:any) =>{
         
    this.tokenPla=data.token;      
    
    });
  }
   


  filtroClienteXXX() {

    let datos = {
      "tipoIde":"CC",
      "numeroIde":"1070985185",
      "sucursal":"0",
      "periodoGeneracion":"2023-12",
      "modalidad":1,
      "usuario":"CVIRACACHA_TCH"
      }
   
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI1ZjU1YTgzZi04NmRjLTQ4MTUtOGM2Ni0zNWYxZmE1NDY3NTMiLCJzdWIiOiJNaWdyYWNpb24xOSIsImlhdCI6MTcwNzc2NzIzMCwiZXhwIjoxNzA3Nzc0NDMwfQ.d0IPuQgPSZb34pUS-Ds0YbXeGgcLzI1UyBa9lnriBbR8IB3-ztTKEu8MBXRB2FZSS2n3skzZrSLuk_VXqGphuQ',
        'Content-Type': 'application/json'
      });

    const body=JSON.stringify(datos);
    console.log(datos);
    console.log(this.tokenPla,'tokenssss');
    return this.http.post<Planillas[]>('https://prbusr.enlace-apb.com/sinapsis-api/services/generarPlanillasOtros',body,{'headers':headers});
  }




}
