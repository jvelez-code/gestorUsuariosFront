import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametrosDTO} from '../_dto/ParametrosDTO';
import { Cliente } from '../_model/cliente';
import { Parametros } from '../_model/parametros';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente> {

  private clienteCambio = new Subject<Cliente[]>();
  private idClienteCambio = new BehaviorSubject<string> ('000');
  private formCambio = new Subject<boolean>();
  private mensajeCambio = new Subject<string>();
  private documentoNuevo = new BehaviorSubject<string> ('000');
  private numeroReal = new BehaviorSubject<string> ('000');
  private callid = new BehaviorSubject<string> ('000');
  

  //private url:string = `${environment.HOST}/clientes`;

  // constructor(
  //   private http: HttpClient,
  //   private router: Router ) { }

    constructor(protected override http: HttpClient) {
      super(
        http,
        `${environment.HOST}/clientes`
      )
    }



    // modificar(cliente: Cliente) {
    //   return this.http.put(this.url, cliente);
    // }

    // listarPorId(id: number) {
    //   return this.http.get<Cliente>(`${this.url}/${id}`);
    // }
    

    guardarCliente(cliente: Cliente):Observable<any>{
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(cliente);
      return this.http.post<Cliente>(`${this.url}`, body, headers);
    }

     filtroCliente(parametrosDTO: ParametrosDTO):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<ParametrosDTO>(`${this.url}/buscar`,body,{'headers':headers});
    }

    
    clientePorId(cliente: Cliente){
      return this.http.post<Cliente[]>(`${this.url}/buscarId`, cliente);
    }

    asteriskCliente(parametrosDTO: ParametrosDTO):Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<ParametrosDTO>(`${this.url}/buscarAsterisk`,body,{'headers':headers});
    }


    //////// GET , SET ///////////////////

    getClienteCambio(){
      return this.clienteCambio.asObservable();
    }
  
    setClienteCambio(cliente: Cliente[]){
      return this.clienteCambio.next(cliente);
    }

    getIdClienteCambio(){

      return this.idClienteCambio.asObservable();
    }

    setIdClienteCambio(idCliente: string ){
      
      return this.idClienteCambio.next(idCliente );
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

    getDocumentoNuevo(){
      return this.documentoNuevo.asObservable();
    }
  
    setDocumentoNuevo(documento: string){
      return this.documentoNuevo.next(documento);
    }


    getnumeroReal(){
      return this.numeroReal.asObservable();
    }
  
    setnumeroReal(numeroTel: string){
      return this.numeroReal.next(numeroTel);
    }


    getcallid(){
      return this.callid.asObservable();
    }
  
    setcallid(idllamada: string){
      return this.callid.next(idllamada);
    }
 
}
