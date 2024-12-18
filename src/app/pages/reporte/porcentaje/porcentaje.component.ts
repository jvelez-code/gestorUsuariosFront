import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import * as moment from 'moment';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { Parametros } from 'src/app/_model/parametros';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { LoginService } from 'src/app/_services/login.service';
import { ExcelPorcentajeDeTipificacionService } from 'src/app/_serviceRepo/excel.porcentaje.de.tipificacion.service';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { ReportesGeneral } from 'src/app/_model/reportesgeneral';
import { EmpresaService } from 'src/app/_services/empresa.service';

@Component({
    selector: 'app-porcentaje',
    templateUrl: './porcentaje.component.html',
    styleUrls: ['./porcentaje.component.scss'],
    standalone: true,
    imports: [MatToolbar, RouterOutlet, MatCard, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, MatInput, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatIcon]
})
export class PorcentajeComponent {



  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  empresaparametro !:  string;
  campana !: number;
  idCampana !: number;
  idEmpresa !: number;

  form!: FormGroup;
  reporteName : string ="PORCENTAJE DE TIPIFICACIÓN"

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  mensaje !: string;
  detalleGestion !: DetalleGestion[];
  parametros !: Parametros;
  agenteDTO !: AgenteDTO;

  displayedColumns: string[] = ['tipificacion', 'suma_total', 'subtipificacion', 'cantidad','porcentaje'];

  dataSource!: MatTableDataSource<ReportesGeneral>;
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
               private excelPorcentajeDeTipificacionService :ExcelPorcentajeDeTipificacionService )  
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
                this.agenteDTO = this.loginService.agenteDTO;
                this.idEmpresa = this.agenteDTO.idEmpresa ?? 0;

                this.empresaService.getEmpresaCambio().subscribe(data =>{
                  this.empresaparametro= data;
                });
              }

    aceptar(){    
      this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
      this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');
      
      const ParametrosDTO= { fechaInicial : this.fechaparametro1, fechaFinal : this.fechaparametro2 ,
                              idEmpresa: this.idEmpresa ,campana:this.idCampana, empresa: this.empresaparametro  }
          
      this.reporteService.reporPorcentaje(ParametrosDTO).subscribe(data=>{
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
      idEmpresa: this.idEmpresa 
    };

    const ParametrosDTO= { fechaInicial : this.fechaparametro1, fechaFinal : this.fechaparametro2 , 
      empresa:this.empresaparametro,
      idEmpresa: this.idEmpresa,
      campana:this.idCampana}
    
    this.reporteService.reporPorcentaje(ParametrosDTO).subscribe((data) => {
      this.excelPorcentajeDeTipificacionService.porcentajeportipificacion(data,parametros);
      // console.log(parametros)
      // console.log(data)
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
