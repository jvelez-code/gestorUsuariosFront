import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiltroEntranteDTO } from '../_dto/filtroEntranteDTO';
import { Cliente } from '../_model/cliente';
import { Parametros } from '../_model/parametros';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //private clienteCambio = new Subject<Cliente>();
  private clienteCambio = new BehaviorSubject<string> ('000');
  private formCambio = new Subject<boolean>();
  private mensajeCambio = new Subject<string>();

  private url:string = `${environment.HOST}/clientes`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }



    

    guardarCliente(cliente: Cliente):Observable<any>{
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(cliente);
      return this.http.post<Cliente>(`${this.url}`, body, headers);
    }

     filtroCliente(filtroEntranteDTO: FiltroEntranteDTO):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(filtroEntranteDTO);
      return this.http.post<Parametros>(`${this.url}/buscar`,body,{'headers':headers});
    }

    
    clientePorId(cliente: Cliente){
      return this.http.post<Cliente[]>(`${this.url}/buscarId`, cliente);
    }

    asteriskCliente(filtroEntranteDTO: FiltroEntranteDTO):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(filtroEntranteDTO);
      return this.http.post<FiltroEntranteDTO>(`${this.url}/buscarAsterisk`,body,{'headers':headers});
    }


    //////// get, set ///////////////////

    getClienteCambio(){

      return this.clienteCambio.asObservable();
    }

    setClienteCambio(idCliente: string ){
      
      return this.clienteCambio.next(idCliente );
    }


    getFormCambio(){

      return this.formCambio.asObservable();
    }

    setFormCambio(cardCliente: any ){
      
      return this.formCambio.next(cardCliente);
    }

    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajecambio(mensaje: string){
      return this.mensajeCambio.next(mensaje);
    }

}
