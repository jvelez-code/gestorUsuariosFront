import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametrosDTO} from '../_dto/ParametrosDTO';
import { Cliente } from '../_model/cliente';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente> {

  private clienteCambio = new Subject<Cliente[]>();
  private idClienteCambio = new BehaviorSubject<number> (0);
  private formCambio = new Subject<boolean>();
  private mensajeCambio = new Subject<string>();
  private documentoNuevo = new BehaviorSubject<string> ('000');
  private numeroReal = new BehaviorSubject<string> ('000');
  private callid = new BehaviorSubject<string> ('000');
  

  constructor(protected override http: HttpClient) {
      super(
        http,
        `${environment.HOST}/clientes`
      )
    }

    guardarCliente(cliente: Cliente): Observable<Cliente>{
      const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
      const body=JSON.stringify(cliente);
      return this.http.post<Cliente>(`${this.url}`, body, headers);
    }

    //Se deja en array para usarlo en la tabla la cual solo recibe array
     filtroCliente(parametrosDTO: ParametrosDTO):Observable<Cliente[]>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<Cliente[]>(`${this.url}/buscar`,body,{'headers':headers});
    }

    buscarCliente(parametrosDTO: ParametrosDTO): Observable <Cliente> {
      const headers = { 'content-type': 'application/json'} 
      return this.http.post<Cliente>(`${this.url}/buscarCliente`, parametrosDTO, {'headers':headers});
    }

    
    clientePorId(cliente: Cliente):Observable<Cliente[]> {
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

    setIdClienteCambio(idCliente: number ){
      
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
