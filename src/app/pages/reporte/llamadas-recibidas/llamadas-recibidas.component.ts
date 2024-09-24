import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { Tmo } from 'src/app/_model/tmo';
import { Parametros } from 'src/app/_model/parametros';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { LoginService } from 'src/app/_services/login.service';
import { ExcelLlamadasRecibidasService } from 'src/app/_serviceRepo/excel.llamadas.recibidas.service';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { EmpresaService } from 'src/app/_services/empresa.service';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';


@Injectable()

@Component({
    selector: 'app-llamadas-recibidas',
    templateUrl: './llamadas-recibidas.component.html',
    styleUrls: ['./llamadas-recibidas.component.scss'],
    standalone: true,
    imports: [MatToolbar, RouterOutlet, MatCard, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, MatInput, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatIcon, DatePipe]
})
export class LlamadasRecibidasComponent implements OnInit {


  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  form!: UntypedFormGroup;
  reporteName : string ="LLAMADAS RECIBIDAS"
  agenteDTO !: AgenteDTO;

  campaignOne!: UntypedFormGroup;
  campaignTwo!: UntypedFormGroup;

  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  empresaparametro !:  string;

  tmo !: Tmo[];
  parametros !: Parametros;
  displayedColumns: string[] = ['fecha_llamada', 'no_calificadas', 'calif_positiva', 
  'calif_negativo', 'total_llamadas','telefono'];
  dataSource!: MatTableDataSource<Tmo>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private reporteService : ReporteService,
    private loginService: LoginService,
    private excelLlamadasRecibidasService : ExcelLlamadasRecibidasService,
    private empresaService: EmpresaService
    ) { 

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new UntypedFormGroup({
      start: new UntypedFormControl(new Date(year, month, 13)),
      end: new UntypedFormControl(new Date(year, month, 16)),

    });

      this.campaignTwo = new UntypedFormGroup({
        start: new UntypedFormControl(new Date(year, month, 15)),
        end: new UntypedFormControl(new Date(year, month, 19)),
      });

  }

  ngOnInit(): void {
    //private empresaService: EmpresaService
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });
  }

  aceptar(){    
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');
    //this.empresaparametro = 'ASISTIDA'

 
    const parametros= {fechaini:this.fechaparametro1, fechafin:this.fechaparametro2,empresa:this.empresaparametro }
   //parametros son los paramatros que enviamos y node.js los toma en el header
    this.reporteService.reporLlamadasRecibidas(parametros).subscribe(data=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  });    }


  //Exportar a excel
  exportar(json: any[], excelFileName:string): void{
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

exportarTodo(): void {
  //this.reporteService.exportar(this.dataSource.data,this.reporteName);
  const parametros = {
    fechaini: this.fechaparametro1,
    fechafin: this.fechaparametro2,
    empresa: this.empresaparametro,
  };
  this.reporteService.reporLlamadasRecibidas(parametros).subscribe((data) => {
    this.excelLlamadasRecibidasService.llamadasrecibidas(data,parametros);
    console.log(parametros)
    console.log(data)
  });


}
exportarFiltro(): void{
  this.reporteService.exportar(this.dataSource.filteredData,'my_export');

}


  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
