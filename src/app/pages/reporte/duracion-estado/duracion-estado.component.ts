import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import * as moment from 'moment';
import { Tmo } from 'src/app/_model/tmo';
import { DuracionEstadoService } from 'src/app/_serviceRepo/excel-duracion-estado.service';
import { Parametros } from 'src/app/_model/parametros';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { LoginService } from 'src/app/_services/login.service';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { EmpresaService } from 'src/app/_services/empresa.service';

@Component({
    selector: 'app-duracion-estado',
    templateUrl: './duracion-estado.component.html',
    styleUrls: ['./duracion-estado.component.scss'],
    imports: [MatToolbar, MatCard, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, MatInput, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatIcon]
})
export class DuracionEstadoComponent implements OnInit {
  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  form!: FormGroup;
  reporteName : string ="DURACION ESTADO"

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  empresaparametro !:  string;
  agenteDTO !: AgenteDTO;

  tmo !: Tmo[];
  duracionEstadoI !:DuracionEstadoService [];
  parametros !: Parametros;

  displayedColumns: string[] = ['extensiones', 'agente', 'dias', 'total', 'hora_limite','diferencia'
                                ,'descripcion','hora'];
  dataSource!: MatTableDataSource<DetalleGestion>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( 
    private reporteService : ReporteService,
    private loginService: LoginService,
    private empresaService: EmpresaService,
    private duracionEstadoService: DuracionEstadoService,
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
    //private empresaService: EmpresaService
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });
  }

  aceptar(){    
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');
    
     
    const parametros= {fechaini:this.fechaparametro1, fechafin:this.fechaparametro2, empresa:this.empresaparametro }
   //parametros son los paramatros que enviamos y node.js los toma en el header
   
    this.reporteService.reporDuracionEstado(parametros).subscribe(data=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  });    }


exportarTodo(): void {
  //this.reporteService.exportar(this.dataSource.data,this.reporteName);
  const parametros = {
    fechaini: this.fechaparametro1,
    fechafin: this.fechaparametro2,
    empresa: this.empresaparametro,
  };
  
  this.reporteService.reporDuracionEstado(parametros).subscribe((data) => {
    this.duracionEstadoService.duracionEstado(data,parametros);
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
