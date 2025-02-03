import { DatePipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import * as moment from 'moment';
import { PagosDiarios } from 'src/app/_model/pagoDiario';
import { Parametros } from 'src/app/_model/parametros';
import { ExcelServiceService } from 'src/app/_serviceRepo/excel.service.service';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { LoginService } from 'src/app/_services/login.service';
import { PagosDiariosService } from 'src/app/_serviceRepo/pagos-diarios.service';
import { ExcelTmoService } from 'src/app/_serviceRepo/excel.tmo.service';


@Component({
  selector: 'app-pagos-diarios',
  standalone: true,
  imports: [
    MatToolbar,
        MatCard,
        ReactiveFormsModule,
        FormsModule,
        MatButton,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardActions,
        MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule,
        MatIcon,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule
  ],
  templateUrl: './pagos-diarios.component.html',
  styleUrl: './pagos-diarios.component.scss'
})
export class PagosDiariosComponent implements AfterViewInit {

  range!: FormGroup;
  fechaInicio!: string;
  fechaFin!: string;
  reporteName: string = "PAGOS DIARIOS";
  parametros !: Parametros;

  fechaparametro1!: string;
  fechaparametro2!: string;
  empresaparametro!: string;

  displayedColumns: string[] = ['fechaPago', 'aportante', 'tipoIdentificacion', 'numIdentificacion'];
  dataSource!: MatTableDataSource<PagosDiarios>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(
    private pagosDiariosService: PagosDiariosService,
    private _excelServiceService: ExcelServiceService,
    private empresaService: EmpresaService
  ) {

    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    
  }

  ngOnInit(): void {

    this.empresaService.getEmpresaCambio().subscribe((data: string) =>{
      this.empresaparametro= data;

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aceptar() {
    this.fechaInicio = this.range.get('start')?.value;
    this.fechaFin = this.range.get('end')?.value;

    // Formateamos las fechas con Moment.js
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');

    // Verificamos los valores
    console.log('Fecha Inicio:', this.fechaparametro1);
    console.log('Fecha Fin:', this.fechaparametro2);

    this.parametros = {
      fechaini: this.fechaparametro1,
      fechafin: this.fechaparametro2,
      empresa: '3'
    };
    //parametros son los paramatros que enviamos y node.js los toma en el header
    console.log(this.parametros);
    this.pagosDiariosService.listarComercial(this.parametros).subscribe(data =>{
      console.log(data,'pagos');
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

  
  }
  
  exportarFiltro(): void {
   
  }



  descargar() {
    const parametros = {
      fechaini: this.fechaparametro1,
      fechafin: this.fechaparametro2,
      empresa: this.empresaparametro,
    };

 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
