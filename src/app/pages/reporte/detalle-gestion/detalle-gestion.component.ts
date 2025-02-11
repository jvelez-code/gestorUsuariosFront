import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { Parametros } from 'src/app/_model/parametros';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { LoginService } from 'src/app/_services/login.service';
import { ExelDetalladoGestionesService } from 'src/app/_serviceRepo/exel.detallado.gestiones.service';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { EmpresaService } from 'src/app/_services/empresa.service';



@Component({
    selector: 'app-detalle-gestion',
    templateUrl: './detalle-gestion.component.html',
    styleUrls: ['./detalle-gestion.component.scss'],
    imports: [MatToolbar, RouterOutlet, MatCard, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, MatInput, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatIcon]
})
export class DetalleGestionComponent implements OnInit {

  aceptarHabilitado: boolean = false;
  fechaInicio: Date = new Date;
  fechaFin: Date = new Date;
  empresaparametro !: string;
  campana !: number;
  idEmpresa !: number;

  idCampana !: number;

  form!: FormGroup;
  reporteName: string = "DETALLE GESTIONES"

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  mensaje !: string;
  detalleGestion !: DetalleGestion[];
  parametros !: Parametros;

  displayedColumns: string[] = ['nombrecampana', 'tipodocaportante', 'numdocaporta', 'razonsocial', 'tipogestion',
    'nombrecontacto', 'telefono1', 'telefono2', 'numerorealmarcado',
    'usuario', 'empresa', 'padretipificacion', 'tipicacion', 'fechagestion', 'observacion', 'empleados'];

  dataSource!: MatTableDataSource<DetalleGestion>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  fechaInicios !: any;
  fechaFins !: any;
  fechaparametro1 !: string;
  fechaparametro2 !: string;
  agenteDTO !: AgenteDTO;


  constructor(
    private reporteService: ReporteService,
    private loginService: LoginService,
    private empresaService: EmpresaService,
    private exelDetalladoGestionesService: ExelDetalladoGestionesService,
    private snackBar: MatSnackBar
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

    this.empresaService.getEmpresaCambio().subscribe(data => {
      this.empresaparametro = data;
    });
  }

  aceptar() {
    this.aceptarHabilitado = true;
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');


    const parametros = { fechaini: this.fechaparametro1, fechafin: this.fechaparametro2, idEmpresa: this.idEmpresa,
      empresa: this.empresaparametro
     }

    //parametros son los paramatros que enviamos y node.js los toma en el header

    this.reporteService.reporDetalleGestion(parametros).subscribe(data => {
      if (data && data.length > 0) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.aceptarHabilitado = false;
      } else {
        this.snackBar.open('NO HAY DATOS EN LAS FECHAS', 'Aviso', {
          duration: 3000,
        });
        this.aceptarHabilitado = false;

      }

    });


  }


  exportarTodo(): void {
    const parametros = { fechaini: this.fechaparametro1, fechafin: this.fechaparametro2, 
      idEmpresa: this.idEmpresa, empresa: this.empresaparametro,}


    this.reporteService.reporDetalleGestion(parametros).subscribe((data) => {
      this.exelDetalladoGestionesService.detalladoGestion(data, parametros);
    });
  }

  exportarFiltro(): void {
    this.reporteService.exportar(this.dataSource.filteredData, 'my_export');

  }


  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

