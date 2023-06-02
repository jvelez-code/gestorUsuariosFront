import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  divipola !: number;


  constructor(
    private clienteService : ClienteService,
    private tipoDocumentoService : TipoDocumentoService,
    private divipolaService : DivipolaService,
    private fb : FormBuilder
  ){
    this.crearFormulario();

  }

  ngOnInit(): void {

    this.tipoDocumento$=this.tipoDocumentoService.buscar();
    this.divipola$= this.divipolaService.buscar();


    /*this.formCliente   = new FormGroup({
      'tipoDoc': new FormControl(''),
      'documento': new FormControl(''),
      'ciudad': new FormControl(''),
      'rsocial': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'celular': new FormControl(''),
      'empleados': new FormControl(''),

    });     */
  }


  crearFormulario(){

    this.formCliente = this.fb.group({
      'documento': ['', [Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      'rsocial': [''],
      'direccion': [''],
      'telefono': [''],
      'celular': [''],
      'correo': ['pruebas@gmail.com',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      'empleados': ['']

    });

  }

  get nombreNoValido() {
    return this.formCliente.get('documento')?.invalid && this.formCliente.get('documento')?.touched
  }

  guardarCliente(){

  console.log(this.formCliente);

    let tipo = new TipoDocumento
    tipo.tipoDoc = this.formCliente.value['documento'];

    let divi = new Divipola
    divi.idZona = this.divipola;


    let cli = new Cliente();
    cli.tipoDocumento = tipo;
    cli.nroDocumento = this.formCliente.value['documento'];
    cli.ciudad = divi;
    cli.razonSocial = this.formCliente.value['rsocial'];
    cli.direccion = this.formCliente.value['direccion'];
    cli.telefonoFijo = this.formCliente.value['telefono'];
    cli.telefonoCelular = this.formCliente.value['celular'];
    cli.correo = this.formCliente.value['correo'];
    cli.cantidadEmpleados = this.formCliente.value['empleados'];

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
