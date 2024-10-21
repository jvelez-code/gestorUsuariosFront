import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgenteDTO } from '../_dto/agenteDTO';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Usuarios } from '../_model/usuarios';
import { Usuario } from '../_model/usuario';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario>{

  private extensionCambio = new BehaviorSubject<number> ( 0 );
  private usuariosCambio = new Subject<Usuarios>();

  //private url:string = `${environment.HOST}/usuarios`;

  /*constructor(private http: HttpClient,
    private router: Router
    ) { }*/

    constructor(http: HttpClient) {
      super(
        http,
        `${environment.HOST}/usuarios`
      );
    }


    listarCalidad() :Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.url}/listarCalidad`);

    }

    buscarAsignaciones(parametrosDTO : ParametrosDTO) :Observable<Usuario[]>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<Usuario[]>(`${this.url}/buscarAsignaciones`,body,{'headers':headers});
    }


    buscarAgenteCampana(parametrosDTO : ParametrosDTO) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<AgenteDTO>(`${this.url}/buscarExt`,body,{'headers':headers});
    }

    loginValidacion(parametrosDTO : ParametrosDTO){
      const headers = { 'content-type': 'application/json'} 
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<Usuarios>(`${this.url}/buscarLogin`, body,{'headers':headers});
    }

    buscar(parametrosDTO : ParametrosDTO){
      const headers = { 'content-type': 'application/json'} 
      const body=JSON.stringify(parametrosDTO);
      
      return this.http.post<Usuario[]>(`${this.url}/buscar`, body,{'headers':headers});

    }

    intentosFallidos(parametrosDTO : ParametrosDTO){
      const headers = { 'content-type': 'application/json'} 
      const body=JSON.stringify(parametrosDTO);      
      return this.http.post<Usuario>(`${this.url}/intento`, body,{'headers':headers});

    }


   ////// GET AND SET

    getExtensionCambio() {
      return this.extensionCambio.asObservable();
    }
  
    setExtensionCambio(extension: number) {
      this.extensionCambio.next(extension);
    }

    getUsuariosCambio(){
      return this.usuariosCambio.asObservable();
    }
  
    setUsuariosCambio(Usuarios: Usuarios){
      this.usuariosCambio.next(Usuarios);
    }
}
