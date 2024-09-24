import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DivipolaDTO } from '../_dto/divipolaDTO ';
import { Divipola } from '../_model/divipola';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class DivipolaService extends GenericService<Divipola> {


  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/divipolas`
    );
  }


  /*private url:string = `${environment.HOST}/divipolas`;

  constructor(
    private http: HttpClient,
    private router: Router) { }*/

    buscar(){
      const headers = { 'content-type': 'application/json'}
      return this.http.get<DivipolaDTO[]>(`${this.url}/buscar`);
    }

    buscarCargue(divipolaDto: DivipolaDTO):Observable<Divipola[]> {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(divipolaDto);
      return this.http.post<Divipola[]>(`${this.url}/buscarCargue`,body,{'headers':headers});
    }

}
