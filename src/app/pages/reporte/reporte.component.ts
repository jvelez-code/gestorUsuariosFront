import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { Reportes } from 'src/app/_model/reportes';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { LoginService } from 'src/app/_services/login.service';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { EmpresaService } from 'src/app/_services/empresa.service';



@Component({
    selector: 'app-reporte',
    templateUrl: './reporte.component.html',
    styleUrls: ['./reporte.component.scss'],
    imports: [MatButtonToggleModule, RouterOutlet, MatToolbar, MatCard, MatCardContent, MatFormField, MatLabel, MatInput, MatSlideToggle, ReactiveFormsModule, FormsModule, NgIf, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatButton, RouterLink, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, NgFor, MatCardSubtitle, MatCardTitle, UpperCasePipe,
        MatCheckboxModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule]
})
export class ReporteComponent implements OnInit {

  displayedColumns = ['serial','nombre_reporte','acciones' ];
  dataSource !: MatTableDataSource<Reportes>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


 
  reportes !:Reportes[];
  empresaparametro !:  string;
  agenteDTO !: AgenteDTO;
  form !: FormGroup;
  tituloPagina = 'Parte de Horas';
  fechaActual: Date = new Date();
  mesActual: number = this.fechaActual.getMonth();
  anoActual: number = this.fechaActual.getFullYear();
  fechaActuals !: string;

  selectedValue!: any;
  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date() ;
  campana !: string

  favoritePie = 'Mosaico';
  pieOptions = ['Mosaico', 'Lista'];
  
  centered = false;
  disabled = false;
  unbounded = false;

  radius!: number;
  color!: string;


  constructor( 
               private reporteService : ReporteService,
               private empresaService: EmpresaService,
               public route: ActivatedRoute,
               private snackBar: MatSnackBar
               ) { }

               
  ngOnInit(): void {
    //private empresaService: EmpresaService,
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });

    // this.agenteDTO = this.loginService.agenteDTO;
    // this.empresaparametro = this.agenteDTO.pseudonimo || '';
    
    const parametros= {empresa : this.empresaparametro }
     this.reporteService.reporEmpresa(parametros).subscribe(data => {

      console.log(data,'reprotes')
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    
    });   
   
    }


 
  filtro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
   
}

