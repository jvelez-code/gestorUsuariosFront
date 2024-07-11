import { Injectable } from '@angular/core';
import { LlamadaEntranteDTO } from '../_dto/LlamadaEntranteDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Observable, Subject } from 'rxjs';
import { LlamadaEntrante } from '../_model/llamadaEntrante';

@Injectable({
  providedIn: 'root'
})
export class SecretariaVirtualService extends GenericService <LlamadaEntrante> {

  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/LlamadasEntrantes`
    );
  }

  llamadaSecretaria(llamadaEntranteDTO: LlamadaEntranteDTO):Observable <LlamadaEntrante> {
    const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };
    //const body=JSON.stringify(parametros);
    return this.http.post<LlamadaEntrante>(`${this.url}/llamadaSecretaria`, llamadaEntranteDTO, headers);
  }


  ///////GET AND SET

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajecambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }
 

}
