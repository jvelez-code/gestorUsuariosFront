import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametros } from '../_model/parametros';

//descargar a excel
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { LlamadasPorHora } from '../_model/llamadasPorHora';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';



@Injectable({
  providedIn: 'root'
})
export class GraficosService {
  private url:string = `${environment.HOSTNODE}/reporContact`;

  constructor(
    private http: HttpClient,
    private router: Router ) { }

 
 
  llamadasporHora(parametros: Parametros):Observable<LlamadasPorHora[]>{      
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(parametros);
  return this.http.post<LlamadasPorHora[]>(`${this.url}/llamadasporHora`,body,{'headers':headers});
 }

     //EXPORTAR A EXCEL

     exportar(json: any[], excelFileName:string): void{
       
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      console.log('worksheet',worksheet)
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
