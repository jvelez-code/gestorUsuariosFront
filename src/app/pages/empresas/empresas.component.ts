import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardSubtitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/_model/empresa';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { EmpresaService } from 'src/app/_services/empresa.service';

@Component({
    selector: 'app-empresas',
    imports: [
        MatToolbar,
        MatToolbarRow,
        MatCard,
        MatCardContent,
        MatCardSubtitle,
        MatSelect,
        NgFor,
        MatOption,
        MatDivider,
        MatButton,
        RouterLink,
        AsyncPipe
    ],
    templateUrl: './empresas.component.html',
    styleUrl: './empresas.component.scss'
})
export class EmpresasComponent implements OnInit {
  [x: string]: any;

  //empresas !: Empresa[];
  empresas$ !: Observable<Empresa[]>;
  pseudonimo !: string;
  

  constructor( 
    private reporteService : ReporteService,
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.empresas$=this.reporteService.empresas();

    this.reporteService.getMensajeCambio().subscribe(data =>{ 
      this.snackBar.open(data, 'AVISO', { duration: 4000 })
    });
  }

  aceptar(){
    
    this.empresaService.setEmpresaCambio(this.pseudonimo)
    
  }

      



}
