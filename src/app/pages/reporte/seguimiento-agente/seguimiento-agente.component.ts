import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { Parametros } from 'src/app/_model/parametros';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { LoginService } from 'src/app/_services/login.service';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { ReportesGeneral } from 'src/app/_model/reportesgeneral';
import { EmpresaService } from 'src/app/_services/empresa.service';
const EXCEL_TYPE ='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()

@Component({
    selector: 'app-seguimiento-agente',
    templateUrl: './seguimiento-agente.component.html',
    styleUrls: ['./seguimiento-agente.component.scss'],
    standalone: true,
    imports: [MatToolbar, RouterOutlet, MatCard, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, MatInput, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatIcon, DatePipe]
})
export class SeguimientoAgenteComponent implements OnInit {
  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  form!: FormGroup;
  reporteName : string ="Seguimiento de Agentes"
  idEmpresa !: number;

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;
  agenteDTO !: AgenteDTO;

  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  empresaparametro !:  string;

  ReportesGeneral !: DetalleGestion[];
  parametros !: Parametros;
  displayedColumns: string[] = ['fecha_gestion','nombre', 'nro_documento', 'ent_efectiva',
    'ent_no_efectiva','sal_efectiva','sal_no_efectiva','sec_efectiva','sec_no_efectiva','total'];
  dataSource!: MatTableDataSource<ReportesGeneral>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( 
    private reporteService : ReporteService,
    private empresaService: EmpresaService,
    private loginService: LoginService,
   ) { 

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),

    });

      this.campaignTwo = new FormGroup({
        start: new FormControl(new Date(year, month, 15)),
        end: new FormControl(new Date(year, month, 19)),
      });

  }

  ngOnInit(): void {
    this.agenteDTO = this.loginService.agenteDTO;
    this.idEmpresa = this.agenteDTO.idEmpresa ?? 0;
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });
  }

  aceptar(){    
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');
    //this.empresaparametro = 'ASISTIDA'

 
    const parametrosDTO= { fechaInicial : this.fechaparametro1, fechaFinal : this.fechaparametro2, 
                           idEmpresa : this.idEmpresa }
   // parametrosDTO que enviamos y node.js los toma en el header
    this.reporteService.reporSeguimiento(parametrosDTO).subscribe(data=>{
    console.log(data);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  });    }


//   //Exportar a excel
//   exportar(json: any[], excelFileName:string): void{
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
//     const workbook :  XLSX.WorkBook = {
//       Sheets:{'data': worksheet},
//       SheetNames: ['data']
//   };
//   const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type:'array'});
//   this.saveExcel(excelBuffer, excelFileName)
// }

// private saveExcel(buffer:any, fileName:string): void {
//   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
//   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
// }

exportarTodo(): void {
  this.reporteService.exportar(this.dataSource.data,this.reporteName);

}
exportarFiltro(): void{
  this.reporteService.exportar(this.dataSource.filteredData,'my_export');

}


  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }






}
