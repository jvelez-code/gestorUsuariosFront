import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DivipolaDTO } from 'src/app/_dto/divipolaDTO ';
import { Cliente } from 'src/app/_model/cliente';
import { Divipola } from 'src/app/_model/divipola';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { ClienteService } from 'src/app/_services/cliente.service';
import { DivipolaService } from 'src/app/_services/divipola.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  formCliente!: FormGroup;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  divipola$ !: Observable<DivipolaDTO[]>;
  tipoDocumento !: string;
  divipola !: string;


  constructor(
    private clienteService : ClienteService,
    private tipoDocumentoService : TipoDocumentoService,
    private divipolaService : DivipolaService
  ){

  }

  ngOnInit(): void {

    this.tipoDocumento$=this.tipoDocumentoService.buscar();
    this.divipola$= this.divipolaService.buscar();


    this.formCliente   = new FormGroup({
      'tipoDoc': new FormControl(''),
      'documento': new FormControl(''),
      'ciudad': new FormControl(''),
      'rsocial': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'celular': new FormControl(''),
      'empleados': new FormControl(''),

    });

      
  }

  guardarCliente(){

    let cli = new Cliente();
    cli.tipoDoc = this.formCliente.value[''];
    cli.nroDoc = this.formCliente.value['documento'];
    cli.ciudad = this.formCliente.value['ciudad'];
    cli.razonSocial = this.formCliente.value['rsocial'];
    cli.direccion = this.formCliente.value['direccion'];
    cli.telFijo = this.formCliente.value['telefono'];
    cli.telCel = this.formCliente.value['celular'];

    this.clienteService.guardarCliente(cli).subscribe(() =>{
      this.clienteService.setMensajecambio('SE REGISTRÓ');
    });
  
    
      
  }

  cancelarCliente(){

    this.formCliente   = new FormGroup({
      'tipoDoc': new FormControl(''),
      'documento': new FormControl(''),
      'ciudad': new FormControl(''),
      'rsocial': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'celular': new FormControl(''),
      'empleados': new FormControl(''),

    });

      
  }
 
}
