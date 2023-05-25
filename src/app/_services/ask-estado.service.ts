import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiltroEstadoDTO } from '../_dto/filtroEstdoDTO ';
import { AskEstado } from '../_model/askEstado';

@Injectable({
  providedIn: 'root'
})
export class AskEstadoService {

  private mensajeCambio = new Subject<string>();

  private url:string = `${environment.HOST}/askEstados`;

  constructor(
    private http: HttpClient,
    private router: Router 
  ) { }

  buscar() {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get<AskEstado[]>(`${this.url}/buscar`,);
  }


  /// MESANJES DE CAMBIO/////
  
  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajecambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

  
}
