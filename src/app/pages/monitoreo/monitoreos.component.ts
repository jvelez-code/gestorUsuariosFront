import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { AskEstadoExtension } from 'src/app/_model/askEstadoExtension';
import { MonitoreoService } from 'src/app/_services/monitoreo.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-monitoreos',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDividerModule,
    MatExpansionModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSlideToggleModule,
    CommonModule
  ],
  templateUrl: './monitoreos.component.html',
  styleUrl: './monitoreos.component.scss'
})

export class MonitoreosComponent implements OnInit, OnDestroy {

  parametrosDTO!: ParametrosDTO;
  empresaparametro !:  string;
  loading !: Boolean;
  mostrarCodigoCuadros: boolean = true; 
  mostrarCodigolista: boolean = false; 
  


  private subscripcion : Subscription = new Subscription();
  displayedColumns = ['serial','extension', 'login', 'fecha','descripcion', 'numero_origen','total'];
  dataSource !: MatTableDataSource<AskEstadoExtension>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private monitoreoService : MonitoreoService)
  {

    this.loading=true;
  }


  ngOnInit(): void {

    this.parametrosDTO = { empresa :'CONTACT'}


    const actualizar = interval(3000)
    this.subscripcion= actualizar.subscribe(n=>{

    this.monitoreoService.monitoreoEmpresa(this.parametrosDTO).subscribe(data => {
      this.dataSource= new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.loading=false;
    })
  })
  }
    
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
   }
 
 
   filtro(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 

    

}
