import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { Usuarios } from 'src/app/_model/usuarios';
import { UsuariosMigraService } from 'src/app/_services/usuarios-migra.service';
import { MatSort } from '@angular/material/sort';
import { duration } from 'moment';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { Observable } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
    selector: 'app-gestion-usuarios',
    templateUrl: './gestion-usuarios.component.html',
    styleUrls: ['./gestion-usuarios.component.scss'],
    standalone: true,
    imports: [RouterOutlet, MatFormField,
      MatInput, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, 
      MatHeaderCell, MatCellDef, MatCell, MatButton, RouterLink, MatIcon, 
      MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow, MatPaginator, 
      MatFabButton, DatePipe, MatTabsModule, MatIconModule, ReactiveFormsModule,
      MatOption, AsyncPipe, MatLabel, MatSelect,
      MatCard, MatCardContent, MatCardTitle, MatCardHeader ]
})
export class GestionUsuariosComponent implements OnInit {

  formUsuario!: FormGroup;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  tipoDocumento : string = 'CC';

  

  displayedColumns: string[] = ['idUsuario', 'enabled', 'fechaCambio','email', 'roles', 'username','failed','acciones', ];
  dataSource!: MatTableDataSource<Usuarios>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private usuariosMigraService: UsuariosMigraService,
    private tipoDocumentoService : TipoDocumentoService,
    private fb : FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {

    this.tipoDocumento$=this.tipoDocumentoService.buscar();

    const parametrosDTO = { loginAgente: 'HELPVOZ', password:'1234' }

    this.usuariosMigraService.listarClaves(parametrosDTO).subscribe(data =>{
          if(data){
            console.log('Hola')

          }else{
            console.log('Mundo')

          }
        
      });


    this.usuariosMigraService.getUsuariosCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    });
    
    this.usuariosMigraService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    });
    
    this.usuariosMigraService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'AVISO', { duration : 2000 } )
    });

    }

    crearFormulario(){

      this.formUsuario = this.fb.group({
           tipoDoc :[],
          'documento':[],
          'primerNombre':[],
          'segundoNombre':[],
          'primerApellido':[],
          'segundoApellido':[],
          'correo':[],
          'usuario':[],
          'empresa':[],
      })
      
    }

    guardarUsuario(){
      console.log('Hola Mundo')
    }




}
