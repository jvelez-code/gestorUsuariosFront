import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import * as moment from 'moment';
import { PagosDiarios } from 'src/app/_model/pagoDiario';
import { Parametros } from 'src/app/_model/parametros';
import { ExcelServiceService } from 'src/app/_serviceRepo/excel.service.service';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { LoginService } from 'src/app/_services/login.service';


@Component({
  selector: 'app-pagos-diarios',
  standalone: true,
  imports: [
    MatToolbar,
        MatCard,
        ReactiveFormsModule,
        FormsModule,
        MatLabel,
        MatButton,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardActions
  ],
  templateUrl: './pagos-diarios.component.html',
  styleUrl: './pagos-diarios.component.scss'
})
export class PagosDiariosComponent {
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  form!: FormGroup;
  reporteName: string = "PAGOS DIARIOS";

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  fechaparametro1!: string;
  fechaparametro2!: string;
  empresaparametro!: string;

  parametros!: Parametros;
  displayedColumns: string[] = ["fecha", "documento", "agente", "cantidadgrabaciones", "duracionllamadas", "segundos" ];
  dataSource!: MatTableDataSource<PagosDiarios>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reporteService: ReporteService,
    private loginService: LoginService,
    private _excelServiceService: ExcelServiceService,
    private empresaService: EmpresaService
  ) {
    
  }

  ngOnInit(): void {

    this.empresaService.getEmpresaCambio().subscribe((data: string) =>{
      this.empresaparametro= data;

    });
  }

  aceptar() {
    this.fechaparametro1 = moment(this.fechaInicio).format(
      "YYYY-MM-DD 00:00:01"
    );
    this.fechaparametro2 = moment(this.fechaFin).format("YYYY-MM-DD 23:59:59");
    //this.empresaparametro = 'ASISTIDA'

    const parametros = {
      fechaini: this.fechaparametro1,
      fechafin: this.fechaparametro2,
      empresa: this.empresaparametro,
    };
    //parametros son los paramatros que enviamos y node.js los toma en el header
    console.log(parametros);
    this.reporteService.reporTmo(parametros).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  exportarTodo(): void {
    //this.reporteService.exportar(this.dataSource.data,this.reporteName);
    const parametros = {
      fechaini: this.fechaparametro1,
      fechafin: this.fechaparametro2,
      empresa: this.empresaparametro,
    };

    this.reporteService.reporTmo(parametros).subscribe((data) => {
      this._excelServiceService.tmoExcel(data,parametros);
      console.log(parametros)
    });
  }
  
  exportarFiltro(): void {
    this.reporteService.exportar(this.dataSource.filteredData, "my_export");
  }

  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  descargar() {
    const parametros = {
      fechaini: this.fechaparametro1,
      fechafin: this.fechaparametro2,
      empresa: this.empresaparametro,
    };

    this.reporteService.reporTmo(parametros).subscribe((data) => {
      this._excelServiceService.tmoExcel(data,parametros);
      
    });
  }


}
