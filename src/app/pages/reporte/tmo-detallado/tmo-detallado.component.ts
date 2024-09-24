import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Tmo } from 'src/app/_model/tmo';
import { Usuario } from 'src/app/_model/usuario';
import { Parametros } from 'src/app/_model/parametros';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { LoginService } from 'src/app/_services/login.service';
import { ExcelTmoDetalladoService } from 'src/app/_serviceRepo/excel.tmo.detallado.service';
import { EmpresaService } from 'src/app/_services/empresa.service';


const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()

@Component({
    selector: 'app-tmo-detallado',
    templateUrl: './tmo-detallado.component.html',
    styleUrls: ['./tmo-detallado.component.scss'],
    standalone: true,
    imports: [MatToolbar, RouterOutlet, MatCard, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, MatInput, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatIcon, DatePipe]
})
export class TmoDetalladoComponent implements OnInit {
 

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  tmo !: Tmo[];
  usuarios  !: Usuario[];
  usuarios$ !: Observable<Usuario[]>
  parametros !: Parametros;
  displayedColumns: string[] = ['fecha', 'id', 'agente', 'telefono', 'duracion'];
  dataSource!: MatTableDataSource<Tmo>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  usuarioSeleccionado !: string;
  form!: FormGroup;
  reporteName : string ="TMO DETALLADO";
  agenteDTO !: AgenteDTO;

  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  empresaparametro !:  string;

  usuarioparametro = this.usuarioSeleccionado;

   

  constructor( 
    private reporteService : ReporteService,
    private loginService :LoginService,
    public route: ActivatedRoute, 
    private excelTmoDetalladoService :ExcelTmoDetalladoService,
    private empresaService: EmpresaService ) { 

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
    //private empresaService: EmpresaService,
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });
  }



  aceptar(){  
        
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');
    

 
    const parametros= {fechaini:this.fechaparametro1, fechafin:this.fechaparametro2,empresa:this.empresaparametro }
   //parametros son los paramatros que enviamos y node.js los toma en el header

   
    this.reporteService.reporTmoDetallado(parametros).subscribe(data=>{
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
  
  this.reporteService.reporTmoDetallado(parametros).subscribe((data) => {
    this.excelTmoDetalladoService.tmoDetallado(data,parametros);
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
