import { Component, OnInit } from '@angular/core';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, withDisabledInitialNavigation } from '@angular/router';
import { Observable } from 'rxjs';
import { AskEstadoExtension } from 'src/app/_model/askEstadoExtension';
import { ControlContainer, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Cliente } from 'src/app/_model/cliente';
import { Contacto } from 'src/app/_model/contactos';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { EstadoGestion } from 'src/app/_model/estadoGestion';
import { Gestion } from 'src/app/_model/gestion';
import { Parametros } from 'src/app/_model/parametros';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { ClienteService } from 'src/app/_services/cliente.service';
import { ContactoService } from 'src/app/_services/contacto.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import * as moment from 'moment';



@Component({
  selector: 'app-filtro-cliente',
  templateUrl: './filtro-cliente.component.html',
  styleUrls: ['./filtro-cliente.component.css']
})



export class FiltroClienteComponent implements OnInit{

  formAgente!: FormGroup;
  formBuscar!: FormGroup;
  formCliente!: FormGroup;

  tipoDocumento !: string;
  nroDocumento  !: string;
  idEmpresa !: number;
  idTipoCampana !: number;
  idCliente   !: number;
  cardCliente !: boolean;
  cardManual !: boolean;
  fechafin !: Date 

  parametros !: Parametros;
  gestion !: Gestion;
  askEstadoExtension !: AskEstadoExtension;

  detalleGestion: DetalleGestion [] = [];

  



  constructor( private TipoDocumentoService : TipoDocumentoService,
    private clienteService : ClienteService,
    private detalleGestionService : DetalleGestionService,
    private gestionService :GestionService ,
    private estadoGestionService :EstadoGestionService,
    private contactoService :ContactoService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private router: Router,
    private snackBar: MatSnackBar) { 

      this.buscarAgente();
    }



  tipoDocumento$ !: Observable<TipoDocumento[]>;

  ngOnInit(): void {

    this.clienteService.getFormCambio().subscribe(data =>{
      this.cardCliente=data;

    });

    this.cardCliente=false;
    this.cardManual=true;

    this.formBuscar = new FormGroup({
       'nroDocumento': new FormControl('')
    });

    this.formAgente   = new FormGroup({
      'agente': new FormControl(''),
      'estado': new FormControl(''),
      'numeroReal': new FormControl(''),
      'horaInicio': new FormControl(''),
      'horaActual': new FormControl(''),

    });

    this.formCliente = new FormGroup({
      'cliente': new FormControl('Dana'),
      'tipoDoc': new FormControl('CC'),
      'identificacion': new FormControl('8080')
   });

    this.tipoDocumento$=this.TipoDocumentoService.buscar();

    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  buscarAgente() {

    const askEstadoExtension ={ nroDocumento :'1023026686' }

    this.askEstadoExtensionService.buscarAgente(askEstadoExtension).subscribe(data =>{
      console.log('Agente:',data)
      this.formAgente   = new FormGroup({
        'agente': new FormControl(data.loginAgente),
        'estado': new FormControl(data.estadoAsk),
        'numeroReal': new FormControl(data.numeroOrigen),
        'horaInicio': new FormControl(data.fechahoraInicioEstado),
        'horaActual': new FormControl(moment().format('YYYY-MM-DD HH:mm:ss')),
  
      });
    });

  }


  buscarManual(){
    this.cardCliente=true;
    this.cardManual=false;

  }

  
  

buscarCliente() {

    this.cardManual=true;

    const parametros= {tipoDoc:this.tipoDocumento, nroDocumento: this.formBuscar.value['nroDocumento']}    
    
    this.clienteService.filtroCliente(parametros).subscribe( data =>{
      this.clienteService.setClienteCambio(data);
    });

    this.formBuscar = new FormGroup({
      'nroDocumento': new FormControl('')
   });


    //this.router.navigate(['entrante']);



    

  }
}
