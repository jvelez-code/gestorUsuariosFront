import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import * as moment from 'moment';
import { Parametros } from 'src/app/_model/parametros';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { LoginService } from 'src/app/_services/login.service';
import { EmpresaService } from 'src/app/_services/empresa.service';

@Component({
    selector: 'app-monitoreo-llamadas',
    templateUrl: './monitoreo-llamadas.component.html',
    styleUrls: ['./monitoreo-llamadas.component.scss'],
    standalone: true,
    imports: [MatToolbar,  MatCardHeader, 
      MatCardTitle, MatCardSubtitle, 
      MatCardActions ,MatCard, 
      ReactiveFormsModule, FormsModule, 
      MatFormField, MatLabel, 
      MatDateRangeInput, MatStartDate, 
      MatEndDate, MatDatepickerToggle, 
      MatSuffix, MatDateRangePicker, 
      MatButton, MatIcon, MatInput, MatTable, 
      MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, 
      MatCellDef, MatCell, 
      MatHeaderRowDef, MatHeaderRow, 
      MatRowDef, MatRow, MatPaginator, DatePipe]
})
export class MonitoreoLlamadasComponent implements OnInit {

  

  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  form!: FormGroup;
  reporteName : string ="MONITOREO LLAMADAS"

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  empresaparametro !:  string;
  agenteDTO !: AgenteDTO;

  parametros !: Parametros;



  displayedColumns: string[] = ['fecha', 'hora','calidad', 'usuario', 'empresa','cliente',
                                'plan','canal','observacion','calificacion'];
  dataSource!: MatTableDataSource<DetalleGestion>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( 
    private reporteService : ReporteService,
    private loginService: LoginService,
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
    //private empresaService: EmpresaService
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });
  }

  aceptar(){    
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');

 
    const parametros= {fechaini:this.fechaparametro1, fechafin:this.fechaparametro2,empresa:this.empresaparametro }
   //parametros son los paramatros que enviamos y node.js los toma en el header

   
    this.reporteService.reporMonitoreoLlamadas(parametros).subscribe(data=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  });    }


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
