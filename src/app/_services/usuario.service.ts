import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AgenteDTO } from '../_dto/agenteDTO';
import { FiltroEntranteDTO } from '../_dto/filtroEntranteDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient,
    private router: Router
    ) { }

    buscarAgenteCampana(filtroEntranteDTO : FiltroEntranteDTO) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(filtroEntranteDTO);
      return this.http.post<AgenteDTO>(`${this.url}/buscarExt`,body,{'headers':headers});

    }
}
