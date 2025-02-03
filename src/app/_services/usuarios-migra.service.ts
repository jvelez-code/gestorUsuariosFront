import { Injectable } from '@angular/core';
import { Usuarios } from '../_model/usuarios';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Observable, Subject } from 'rxjs';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { UsuariosClaves } from '../_model/usuariosClave';

@Injectable({
  providedIn: 'root'
})
export class UsuariosMigraService extends GenericService<Usuarios> {


  //usuariosCambio = new Subject<Usuarios[]>();
  private usuariosCambio = new Subject<Usuarios[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/UsuariosMigra`
    );
  }
  private urlUsu = `${environment.HOST}/UsuariosClaves`

  usuariosCalidad(parametrosDTO : ParametrosDTO):Observable<Usuarios>{
    const headers = { 'content-type': 'application/json'} 
    return this.http.post<Usuarios>(`${this.url}/usuariosCalidad`,parametrosDTO,{'headers':headers});
  }


  listarClaves(parametrosDTO : ParametrosDTO):Observable<boolean>{
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(parametrosDTO);  
    return this.http.post<boolean>(`${this.urlUsu}/listarClaves`, body,{'headers':headers});
  }


   ultimoLogin(parametrosDTO : ParametrosDTO){
    const headers = { 'content-type': 'application/json'} 
    const body=JSON.stringify(parametrosDTO);  
    return this.http.post<Usuarios>(`${this.url}/ultimoLogin`, body,{'headers':headers});
  }

 

    ////////////////// get, set ////////////////

    getUsuariosCambio(){
      return this.usuariosCambio.asObservable();
    }
  
    setUsuariosCambio(usuarios: Usuarios[]){
      this.usuariosCambio.next(usuarios);
    }
  
    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajecambio(mensaje: string){
      return this.mensajeCambio.next(mensaje);
    }
 
}
