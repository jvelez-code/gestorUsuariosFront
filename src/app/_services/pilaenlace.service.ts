import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planillas } from '../_model/planillas';
import { Observable } from 'rxjs';
import { ApiPilaDto } from '../_dto/apiPilaDTO';
import { RespuestaPila } from '../_dto/RespuestaPila';

@Injectable({
  providedIn: 'root'
})
export class PilaenlaceService {


  private url: string = `https://servicios-pila.enlace-apb.com`;
  private urlPrueba: string = `https://prbusr.enlace-apb.com`;
  private token !: string;
  private tokenPila !: string;

  constructor(
    protected http: HttpClient,
    //@Inject(string) protected urlGenerarPlanilla: string
  ) {
    this.buscarToken();
    this.buscarTokenPila();
    this.tokenPlanillas();
  }

  buscarToken() {
    const header = { 'content-type': 'application/json' }

    const parametros = {
      'usuario': 'VFB6d2dGdjgyZVE0dlZ4eHVxY2hidz09',
      'clave': 'Y1hyRnZXaTBzV2dtOHBmaFpMNnhPUT09',
      'token': '',
      'error': 0
    }

    const body = JSON.stringify(parametros);

    this.http.post('https://prbtsoa.enlace-apb.com/sinapsis-api/services/authorize', body, { 'headers': header }).subscribe((data: any) => {

      this.token = data.token;
    });
  }





  tokenPlanillas() {
    const header = { 'content-type': 'application/json' }

    const parametros = {
      'usuario': 'VFB6d2dGdjgyZVE0dlZ4eHVxY2hidz09',
      'clave': 'Y1hyRnZXaTBzV2dtOHBmaFpMNnhPUT09',
      'token': '',
      'error': 0
    }

    const body = JSON.stringify(parametros);

    this.http.post(`${this.url}/sinapsis-api/services/authorize/`, body, { 'headers': header }).subscribe((data: any) => {

    });
  }


  //APIS PARA GENERAR PLANILLA

  buscarTokenPila() {
    const header = { 'content-type': 'application/json' }
    const parametros = {
      'usuario': 'TllTaTNGdEtFbERTWWpzUmFIZklnZz09',
      'clave': 'Y1hyRnZXaTBzV2dtOHBmaFpMNnhPUT09'
    }

    const body = JSON.stringify(parametros);

    this.http.post(`${this.url}/sinapsis-api/services/authorize`, body, { 'headers': header }).subscribe((data: any) => {

      this.tokenPila = data.token;
    });
  }

  generarPlanillaS(apiPilaDto: ApiPilaDto): Observable<any> {
    //6

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenPila,
      'Content-Type': 'application/json'
    })
    if (!this.tokenPila) {
      console.log('No hay token generarPlanilla()')
    }
    const body = JSON.stringify(apiPilaDto);
    return this.http.post<RespuestaPila[]>(`${this.url}/sinapsis-api/services/generarPlanillasOtros`, body, { 'headers': headers });

  }


  envioSoporte(apiPilaDto: ApiPilaDto) {
    //5

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenPila,
      'Content-Type': 'application/json'
    })
    if (!this.tokenPila) {
      console.log('No hay token envioSoporteS()')
    }
    return this.http.get<RespuestaPila>(`${this.url}/sinapsis-api/services/generarReportePlanilla/${apiPilaDto.planilla}/${apiPilaDto.reporte}`, { 'headers': headers });

  }


  validarPlanillaS(apiPilaDto: ApiPilaDto) {
    //4
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenPila,
      'Content-Type': 'application/json'
    })
    if (!this.tokenPila) {
      console.log('No hay token envioSoporteS()')
    }
    const body = JSON.stringify(apiPilaDto);
    return this.http.get<RespuestaPila>(`${this.url}/sinapsis-api/services/consultarPlanillas/Pagas/CC/1070985185/2024-01`, { 'headers': headers });

  }

  buscarPlanilla(tipo: string, docu: string, anio: string, mes: string): Observable<Planillas[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
    if (!this.token) {
    }
    return this.http.get<Planillas[]>(`${this.url}/sinapsis-api/services/getPlanillasIndependientes/${tipo}/${docu}/${anio}-${mes}`, { headers });
  }


  buscarPlanillas(): Observable<RespuestaPila> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })
 
    return this.http.get<RespuestaPila>(`${this.urlPrueba}/sinapsis-api/services/consultarPlanillas/Activas/CC/1070985185/2023-12`, { headers });
  }

}
