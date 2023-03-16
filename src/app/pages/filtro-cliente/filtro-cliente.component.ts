import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { Contacto } from 'src/app/_model/contactos';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { EstadoGestion } from 'src/app/_model/estadoGestion';
import { Gestion } from 'src/app/_model/gestion';
import { Parametros } from 'src/app/_model/parametros';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { ClienteService } from 'src/app/_services/cliente.service';
import { ContactoService } from 'src/app/_services/contacto.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';



@Component({
  selector: 'app-filtro-cliente',
  templateUrl: './filtro-cliente.component.html',
  styleUrls: ['./filtro-cliente.component.css']
})



export class FiltroClienteComponent implements OnInit{

  formBuscar!: FormGroup;

  tipoDocumento !: string;
  nroDocumento  !: string;
  idEmpresa !: number;
  idTipoCampana !: number;
  idCliente   !: number;

  parametros !: Parametros;
  gestion !: Gestion;

  detalleGestion: DetalleGestion [] = [];

  



  constructor( private TipoDocumentoService : TipoDocumentoService,
    private clienteService : ClienteService,
    private detalleGestionService : DetalleGestionService,
    private gestionService :GestionService ,
    private estadoGestionService :EstadoGestionService,
    private contactoService :ContactoService,
    private router: Router,
    private snackBar: MatSnackBar) { }



  tipoDocumento$ !: Observable<TipoDocumento[]>;

  ngOnInit(): void {


    this.formBuscar = new FormGroup({
       'nroDocumento': new FormControl('')
    });

    this.tipoDocumento$=this.TipoDocumentoService.buscar();
  }

  
  

buscarCliente(){

    const parametros= {tipoDoc:this.tipoDocumento, nroDoc: this.formBuscar.value['nroDocumento']}
    
    this.clienteService.filtroCliente(parametros).subscribe( data =>{

      this.clienteService.setClienteCambio(data);

    });

    

  }
}
