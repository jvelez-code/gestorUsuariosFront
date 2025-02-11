import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CrmCasos } from 'src/app/_model/crmCasos';
import { CrmCasosService } from 'src/app/_services/crm-casos.service';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ClienteService } from 'src/app/_services/cliente.service';

@Component({
    selector: 'app-crm-abiertos',
    imports: [MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatGridListModule,
        CommonModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './crm-abiertos.component.html',
    styleUrl: './crm-abiertos.component.scss'
})
export class CrmAbiertosComponent implements OnInit{


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tipoDocumento !: string;
  nroDocumento !: string;
  idCliente !: any;
 


  constructor(

    private crmCasosService: CrmCasosService,
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ){

  }

  ngOnInit(): void {

    this.crmCasosService.casosEstado().subscribe(data => {
      this.dataSourceCasos = new MatTableDataSource( data );
      this.dataSourceCasos.paginator= this.paginator;
    })

  }

  crmCasosColumns: string[] = ['idCaso','tipoDocumento','nroDocumento','nroRealmarcado','fechaCaso', 'fechaVencimiento', 
                                'fechaCierre', 'nombreCategoria','nombreSubcategoria','nombreTipologia', 
                                'nombreEstado','nombreNivel','nombreDepartamento','acciones'];
  dataSourceCasos!: MatTableDataSource<CrmCasos>; 



  buscarCliente(tipo: string, nro: string) {
    const parametrosDTO = { tipoDoc: tipo, nroDocumento: nro }

    this.clienteService.filtroCliente(parametrosDTO).subscribe(data => {
        this.idCliente = data[0].idCliente;
        this.clienteService.setIdClienteCambio(this.idCliente);
        this.router.navigate(['crmCuentas']);
        
    });

    
  }





}
