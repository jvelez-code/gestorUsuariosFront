import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';

//descargar a excel
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Parametros } from '../_model/parametros';
import { DetalleGestion } from '../_model/detalleGestion';
import { Reportes } from '../_model/reportes';
import { ReportesGeneral } from '../_model/reportesgeneral';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Empresa } from '../_model/empresa';
import { Gestion } from '../_model/gestion';
import { AskLogEstado } from '../_model/askLogEstado';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';


@Injectable({
  providedIn: 'root'
})



export class ReporteService {

  private mensajeCambio = new Subject<string>();
  fechaCapturada!: string;
  
  private urlCon:string = `${environment.HOSTNODE}/reporContact`;
  private urlGes:string = `${environment.HOSTNODE}/reporGestor`;

  constructor(private http: HttpClient) { }



  //REPORTES CONTACT

  reporLlamadasPerdidas(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/llamadasPerdidas`,body,{'headers':headers});
   }

  reporCalificacionServicio(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/calificacionServicio`,body,{'headers':headers});
   }

  reporTmoEntranteSaliente(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/tmoEntranteSaliente`,body,{'headers':headers});
   }

  reporTmoSaliente(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/tmoSaliente`,body,{'headers':headers});
   }

  reporLlamadasRecibidas(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/llamadasRecibidas`,body,{'headers':headers});
   }


  reporSecretariaVirtual(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/SecretariaVirtual`,body,{'headers':headers});
   }

   reporTmoDetallado(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/tmodetallado`,body,{'headers':headers});
   }
 
    reporTmo(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/tmo`,body,{'headers':headers});
   }

   reporIvr(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/ivr`,body,{'headers':headers});
   }


   reporLlamadasFueradeHorario(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/llamadasFueradeHorario`,body,{'headers':headers});
   }


   reporLlamadasFueradeHorarioEventual(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/llamadasFueradeHorarioEventual`,body,{'headers':headers});
   }


   reporLlamadasCalificadasGDE(parametros: Parametros):Observable<any>{
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<Parametros>(`${this.urlCon}/llamadasCalificadasGDE`,body,{'headers':headers});
   }

   reporfiltradosSecretaria(parametros: Parametros) {  
      
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(parametros);
    return this.http.post<any[]>(`${this.urlCon}/filtradosSecretaria`,body,{'headers':headers});
   }




 



  //REPORTES GESTOR

    listar(){
      return this.http.get<Reportes[]>(`${this.urlGes}/reportess`);
    }

    listarId(id: number){
      return this.http.get<Reportes>(`${this.urlGes}/reportess/${id}`);

    }


    reporSeguimiento(parametrosDTO: ParametrosDTO):Observable<ReportesGeneral[]>{      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<ReportesGeneral[]>(`${this.urlGes}/seguimiento`,body,{'headers':headers});
     }

     detalleEstadosEmb(parametrosDTO: ParametrosDTO):Observable<AskLogEstado[]>{      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<AskLogEstado[]>(`${this.urlCon}/detalleEstadosEmb`,body,{'headers':headers});
     }

    reporEmpresa(parametros: Parametros):Observable<any>{      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros>(`${this.urlGes}/reportes`,body,{'headers':headers});
     }
  
    listarGestion(){
      return this.http.get<Gestion[]>(`${this.urlGes}/gestion`);
    }

    listarGestionxfecha(gestion: Gestion):Observable<Gestion>{
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(gestion);
      return this.http.post<Gestion>(`${this.urlGes}/gestion`,body,{'headers':headers});
      
    }

    reporMonitoreoLlamadas(parametros: Parametros):Observable<any>{
      const fecha = new Date();
      this.fechaCapturada = fecha.toString();  // Puedes formatearla como quieras
      console.log('Fecha capturada en tiempo real:', this.fechaCapturada);
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros>(`${this.urlGes}/monitoreoLlamadas`,body,{'headers':headers});
     }


    reporDuracionEstado(parametros: Parametros):Observable<any>{
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros>(`${this.urlCon}/duracionEstado`,body,{'headers':headers});
     }

     reporDetalleGestion(parametros: Parametros):Observable<any>{  
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros>(`${this.urlGes}/detallegestiones`,body,{'headers':headers});
     }

     reporCompromisoComercial(parametros: Parametros) {  
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<DetalleGestion[]>(`${this.urlGes}/compromisos`,body,{'headers':headers});
     }

     reporPorcentaje(parametrosDTO: ParametrosDTO):Observable<ReportesGeneral[]> {        
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametrosDTO);
      return this.http.post<ReportesGeneral[]>(`${this.urlGes}/porcentaje`,body,{'headers':headers});
     }

     reporConsolidadoGestionComercial(parametros: Parametros) {  
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<DetalleGestion[]>(`${this.urlGes}/gestionComercial`,body,{'headers':headers});
     }

     reporConsolidadoCicloVida(parametros: Parametros) {  
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<AskLogEstado[]>(`${this.urlGes}/ConsolidadodeCicloVida`,body,{'headers':headers});
     }

     reporReporteAgenda(parametros: Parametros) {  
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<DetalleGestion[]>(`${this.urlGes}/ReporteAgenda`,body,{'headers':headers});
     }

     reporControlVisitas(parametros: Parametros) {  
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<DetalleGestion[]>(`${this.urlGes}/ControlVisitas`,body,{'headers':headers});
     }

     reporRegistrosnuevos(parametros: Parametros) {  
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<DetalleGestion[]>(`${this.urlGes}/registrosnuevos`,body,{'headers':headers});
     }

  

    //USUARIO
    usuariosXEmpresa(parametros: Parametros):Observable<any>{
      
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(parametros);
      return this.http.post<Parametros>(`${this.urlCon}/usuarios`,body,{'headers':headers});

    }

    empresas(){
      return this.http.get<Empresa[]>(`${this.urlGes}/empresas`);

    }

    listarCampanas(parametros: Parametros):Observable<any>{
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(parametros);
      return this.http.post<any>(`${this.urlGes}/campanas`,body, {'headers':headers});
    }


    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajecambio(mensaje: string){
      return this.mensajeCambio.next(mensaje);
    }


   


    //EXPORTAR A EXCEL

    exportar(json: any[], excelFileName:string): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook :  XLSX.WorkBook = {
        Sheets:{'data': worksheet},
        SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type:'array'});
    this.saveExcel(excelBuffer, excelFileName)
  }
  
  private saveExcel(buffer:any, fileName:string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
  }


}
