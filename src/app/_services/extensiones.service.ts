import { Injectable } from '@angular/core';
import { Extension } from '../_model/extension';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ParametrosDTO } from '../_dto/ParametrosDTO';

@Injectable({
  providedIn: 'root'
})
export class ExtensionesService extends GenericService<Extension>{
  
    constructor(http: HttpClient) {
      super(
        http,
        `${environment.HOST}/Extensiones`
      );
    }


        crearExt(extension: Extension) :Observable < number> { 
          const headers = { 'content-type': 'application/json'}
          return this.http.post<number>(`${this.url}/extEmpresa`,extension,{'headers':headers});
        }


  
        buscarExt(parametrosDTO :ParametrosDTO):Observable < Extension[]> {
        const headers = { 'content-type': 'application/json'}  
        return this.http.post<Extension[]>(`${this.url}/buscarExt`,parametrosDTO,{'headers':headers});
  
      }
}
