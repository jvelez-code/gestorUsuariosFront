import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametros } from '../_model/parametros';
import { Contacto } from '../_model/contactos';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private url:string = `${environment.HOST}/contactos`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }


    filtroContacto(parametros: Parametros):Observable<any>{
       const headers = { 'content-type': 'application/json'}  
       const body=JSON.stringify(parametros);
       return this.http.post<Contacto>(`${this.url}/buscar`,body,{'headers':headers});
     }
}
