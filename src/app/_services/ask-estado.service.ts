import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AskEstado } from '../_model/askEstado';

@Injectable({
  providedIn: 'root'
})
export class AskEstadoService {

  private url:string = `${environment.HOST}/askEstados`;

  constructor(
    private http: HttpClient,
    private router: Router 
  ) { }

  buscar() {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get<AskEstado[]>(`${this.url}/buscar`,);

  }
}
