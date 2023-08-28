import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgenteDTO } from '../_dto/agenteDTO';
import { FiltroEntranteDTO } from '../_dto/filtroEntranteDTO';
import { Usuarios } from '../_model/usuarios';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private extensionCambio = new BehaviorSubject<number> ( 0 )

  private url:string = `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient,
    private router: Router
    ) { }

    buscarAgenteCampana(filtroEntranteDTO : FiltroEntranteDTO) {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(filtroEntranteDTO);
      return this.http.post<AgenteDTO>(`${this.url}/buscarExt`,body,{'headers':headers});

    }

    loginValidacion(filtroEntranteDTO : FiltroEntranteDTO){
      const headers = { 'content-type': 'application/json'} 
      const body=JSON.stringify(filtroEntranteDTO);
      return this.http.post<Usuarios>(`${this.url}/buscarLogin`, body,{'headers':headers});
    }

    buscar(filtroEntranteDTO : FiltroEntranteDTO){
      const headers = { 'content-type': 'application/json'} 
      const body=JSON.stringify(filtroEntranteDTO);
      
      return this.http.post<Usuario[]>(`${this.url}/buscar`, body,{'headers':headers});

    }




    getExtensionCambio() {
      return this.extensionCambio.asObservable();
    }
  
    setExtensionCambio(extension: number) {
      this.extensionCambio.next(extension);
    }

}
