import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Parametros } from 'src/app/_model/parametros';
import * as moment from 'moment';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/_services/login.service';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { EmpresaService } from 'src/app/_services/empresa.service';


@Component({
    selector: 'app-control-visitas',
    templateUrl: './control-visitas.component.html',
    styleUrls: ['./control-visitas.component.scss'],
    standalone: true,
    imports: [MatToolbar, RouterOutlet, MatCard, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, MatInput, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatIcon]
})
export class ControlVisitasComponent {
  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  empresaparametro !:  string;
  campana !: number;

  
  idCampana !: number;

  form!: FormGroup;
  reporteName : string ="CONTROL VISITAS"

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  mensaje !: string;
  detalleGestion !: DetalleGestion[];
  parametros !: Parametros;

  displayedColumns: string[] = ['motivo', 'razon_social', 'tipo_documento', 'nro_documento','numero_contacto', 'correo_electronico', 
                                'contacto', 'cargo', 'cantidad_empleados', 'municipio', 'departamento', 'direccion', 'fecha_ingreso_visita',
                                'fecha_salida_visita', 'fecha_gestion_seguimiento','usuario', 'operador_actual','encuesta_n1','encuesta_n2',
                                'encuesta_n3','encuesta_n4','encuesta_n5','encuesta_n6','encuesta_f1','encuesta_f2','encuesta_f3',
                                'encuesta_f4','encuesta_f5','encuesta_observaciones','observacion','compromiso','responsable',
                                'fecha_compromiso','referidos_empresa','referidos_contacto','referidos_email','referidos_telefono','fecha_liquidacion_pago'];

  dataSource!: MatTableDataSource<DetalleGestion>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  fechaInicios !: any;
  fechaFins !: any;
  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  agenteDTO !: AgenteDTO;
  

  constructor( private reporteService : ReporteService, 
               private empresaService: EmpresaService,
               private loginService: LoginService,
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
     
      this.reporteService.reporControlVisitas(parametros).subscribe(data=>{
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
