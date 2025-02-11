import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import * as moment from 'moment';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/_services/login.service';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { Parametros } from 'src/app/_model/parametros';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { MatInput } from '@angular/material/input';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-registros-nuevos',
    templateUrl: './registros-nuevos.component.html',
    styleUrls: ['./registros-nuevos.component.scss'],
    imports: [
        MatToolbar, MatCardHeader,
        MatCardTitle, MatCardSubtitle,
        MatCardActions, MatCard,
        ReactiveFormsModule, FormsModule,
        MatFormField, MatLabel,
        MatDateRangeInput, MatStartDate,
        MatEndDate, MatDatepickerToggle,
        MatSuffix, MatDateRangePicker,
        MatButton, MatIcon, MatInput, MatTable,
        MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell,
        MatCellDef, MatCell,
        MatHeaderRowDef, MatHeaderRow,
        MatRowDef, MatRow, MatPaginator, DatePipe
    ]
})
export class RegistrosNuevosComponent {

  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  empresaparametro !:  string;
  campana !: number;
  idCampana !: number;
  agenteDTO !: AgenteDTO;

  form!: FormGroup;
  reporteName : string ="REGISTROS NUEVOS"

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  mensaje !: string;
  detalleGestion !: DetalleGestion[];
  parametros !: Parametros;

  displayedColumns: string[] = ['usuario', 'cod_caja', 'tipo_documento', 'nro_documento','razon_social', 
                                'sucursal', 'registros_nuevos', 'registros_recuperados', 'fecha_pago',
                                'numero_planilla', 'observacion', 'migracion', 'fecha_gestion',];

  dataSource!: MatTableDataSource<DetalleGestion>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  fechaInicios !: any;
  fechaFins !: any;
  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  

  constructor( private reporteService : ReporteService, 
               private route: ActivatedRoute,
               private loginService: LoginService,
               private empresaService: EmpresaService,
               private router: Router) 
               { 
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
   
      const parametros= { fechaini:this.fechaparametro1, fechafin:this.fechaparametro2,empresa:this.empresaparametro,
                          campana:this.idCampana}
     //parametros son los paramatros que enviamos y node.js los toma en el header
     
      this.reporteService.reporRegistrosnuevos(parametros).subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  
    }); 
  }
  
  
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
