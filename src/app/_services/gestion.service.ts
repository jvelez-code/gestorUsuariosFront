import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gestion } from '../_model/gestion';
import { Parametros } from '../_model/parametros';
import { CantidadGestionDTO } from '../_dto/CantidadGestionDTO ';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { GenericService } from './generic.service';
import { CargueArchivoDTO } from '../_dto/CargueArchivoDTO';

@Injectable({
  providedIn: 'root'
})
export class GestionService extends GenericService<Gestion>{

  //private url:string = `${environment.HOST}/gestiones`;
  private gestionCambio = new Subject<CantidadGestionDTO[]>();
  private idGestionSaliente = new BehaviorSubject<number> (0);



     constructor(
      http: HttpClient ) {
      super(
        http,
        `${environment.HOST}/gestiones`
      );
    }

    gestionCampana(parametrosDTO: ParametrosDTO) :Observable<number> {
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };
      return this.http.post<number>(`${this.url}/gestionCampana`, parametrosDTO, headers);
    }  

    gestionCampanaFal(parametrosDTO: ParametrosDTO) :Observable<number> {
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };
      return this.http.post<number>(`${this.url}/gestionCampanaFal`, parametrosDTO, headers);
    }  


    
 

    gestionHistoricoS(parametros: Parametros):Observable<Gestion>{
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(parametros);
      return this.http.post<Gestion>(`${this.url}/buscar`, body, headers);
    }

    guardarGestionS(gestion: Gestion):Observable<Gestion>{
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(gestion);
      return this.http.post<Gestion>(`${this.url}`, body, headers);
    }

    guardarGestionComercial(gestion: Gestion) {
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(gestion);
      return this.http.post<Gestion>(`${this.url}/comercial`, body, headers);
    }

    buscarGestionSaliente(parametrosDTO: ParametrosDTO) :Observable<ParametrosDTO> {
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<ParametrosDTO>(`${this.url}/saliente`, body, headers);
    }  

    salienteGestion(id: number , gestion: Gestion) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(gestion);
      return this.http.patch<Gestion>(`${this.url}/${id}`,body,{'headers':headers});
    }

    actulizaGestionSaliente(gestion: Gestion) {
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(gestion);
      return this.http.put<Gestion>(`${this.url}/comercial`, body, headers);
    }

    cargueArchivo(file: File,parametroDTO: ParametrosDTO):Observable<ParametrosDTO>  {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      
      for (const key in parametroDTO) {
        if (parametroDTO.hasOwnProperty(key)) {
          formData.append(key, parametroDTO[key]);
        }
      }
      return this.http.post<ParametrosDTO>(`${this.url}/cargueArchivo`, formData);
    }

    registrarCargue(gestion: Gestion):Observable<Gestion>{
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(gestion);
      return this.http.post<Gestion>(`${this.url}/registrarCargue`, body, headers);
    }





    //////// get, set ///////////////////

    getGestionCambio(){
      return this.gestionCambio.asObservable();
    }
  
    setGestionCambio(gestion: CantidadGestionDTO[]){
      return this.gestionCambio.next(gestion);
    }

    setIdGestionSaliente(idGestion: number){
      return this.idGestionSaliente.next(idGestion);
    }

    getIdGestionSaliente(){
      return this.idGestionSaliente.asObservable();
    }
  
}
