import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { Parametros } from 'src/app/_model/parametros';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { AskLogEstado } from 'src/app/_model/askLogEstado';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ask-log-estados',
  standalone: true,
  imports: [
    MatToolbar,
    RouterOutlet,
    MatCard,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatDateRangeInput,
    MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, MatInput, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatIcon],
  templateUrl: './ask-log-estados.component.html',
  styleUrl: './ask-log-estados.component.scss'
})
export class AskLogEstadosComponent implements OnInit {

  fechaInicio: Date = new Date;
  fechaFin: Date = new Date;
  empresaparametro !: string;
  agenteDTO !: AgenteDTO;
  idCampana !: number;

  form!: FormGroup;
  reporteName: string = "ESTADOS AGENTES"

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  mensaje !: string;
  askLogEstado !: AskLogEstado[];
  parametros !: Parametros;

  displayedColumns: string[] = ['usuario', 'fecha_ini', 'fecha_fin', 'diferencia', 'id_extension',
    'estado', 'descripcion'];

  dataSource!: MatTableDataSource<AskLogEstado>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  fechaInicios !: any;
  fechaFins !: any;
  fechaparametro1 !: string;
  fechaparametro2 !: string;


  constructor(private reporteService: ReporteService,
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar,
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
    this.empresaService.getEmpresaCambio().subscribe(data => {
      this.empresaparametro = data;
    });
  }


  aceptar() {
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');

    const parametros = {
      fechaInicial: this.fechaparametro1, fechaFinal: this.fechaparametro2,
      empresa: this.empresaparametro,
      campana: this.idCampana, documento: '1023026686'
    }
    //parametros son los paramatros que enviamos y node.js los toma en el header

    this.reporteService.detalleEstadosEmb(parametros).subscribe(data => {
      if (data && data.length > 0) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.snackBar.open('NO HAY DATOS EN LAS FECHAS', 'Aviso', {
          duration: 3000,
        });
      }

    });
  }


  exportarTodo(): void {
    this.reporteService.exportar(this.dataSource.data, this.reporteName);

  }
  exportarFiltro(): void {
    this.reporteService.exportar(this.dataSource.filteredData, 'my_export');

  }


  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
