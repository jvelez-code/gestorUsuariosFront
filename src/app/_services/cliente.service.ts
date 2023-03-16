import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../_model/cliente';
import { Parametros } from '../_model/parametros';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteCambio = new Subject<Cliente>();
  private url:string = `${environment.HOST}/clientes`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }



      filtroCliente(parametros: Parametros):Observable<any>{
      console.log('parame',parametros)  
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros>(`${this.url}/buscar`,body,{'headers':headers});
    }

    // clientePorId(cliente: Cliente):Observable<any>{
    //   console.log('parame',cliente)  
    //   const headers = { 'content-type': 'application/json'}  
    //   const body=JSON.stringify(cliente);
    //   return this.http.post<Cliente>(`${this.url}/buscarId`,body,{'headers':headers});
    // }

    clientePorId(cliente: Cliente){
      return this.http.post<Cliente[]>(`${this.url}/buscarId`, cliente);
    }


    //////// get, set ///////////////////

    getClienteCambio(){

      return this.clienteCambio.asObservable();
    }

    setClienteCambio(cliente: Cliente ){
      
      return this.clienteCambio.next(cliente );
    }

}
