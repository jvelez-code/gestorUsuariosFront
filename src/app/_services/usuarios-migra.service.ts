import { Injectable } from '@angular/core';
import { Usuarios } from '../_model/usuarios';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosMigraService extends GenericService<Usuarios> {


  private usuariosCambio = new Subject<Usuarios[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/UsuariosMigra`
    );
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
