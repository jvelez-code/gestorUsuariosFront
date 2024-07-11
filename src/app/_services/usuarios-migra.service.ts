import { Injectable } from '@angular/core';
import { Usuarios } from '../_model/usuarios';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { ParametrosDTO } from '../_dto/ParametrosDTO';

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
