import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DivipolaDTO } from 'src/app/_dto/divipolaDTO ';
import { Cliente } from 'src/app/_model/cliente';
import { Divipola } from 'src/app/_model/divipola';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { Usuario } from 'src/app/_model/usuario';
import { ClienteService } from 'src/app/_services/cliente.service';
import { DivipolaService } from 'src/app/_services/divipola.service';
import { LoginService } from 'src/app/_services/login.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import { ValidadoresService } from 'src/app/_services/validadores.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  formCliente!: FormGroup;

  tipoDocumento$ !: Observable<TipoDocumento[]>;
  divipola$ !: Observable<DivipolaDTO[]>;
  tipoDocumento : string = 'CC';
  documento !: string;
  divipola : number = 184;
  usuario   !: any;


  constructor(
    private clienteService : ClienteService,
    private tipoDocumentoService : TipoDocumentoService,
    private divipolaService : DivipolaService,
    private loginService : LoginService,
    private validadoresService : ValidadoresService,
    private fb : FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ){
    this.crearFormulario();

  }

  ngOnInit(): void {

    this.loginService.getUsuariosCambio().subscribe((data:any) =>{
      this.usuario=data;
     });

    this.tipoDocumento$=this.tipoDocumentoService.buscar();
    this.divipola$= this.divipolaService.buscar();

    

    this.clienteService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  


  crearFormulario(){

    this.clienteService.getDocumentoNuevo().subscribe(data =>{
      this.documento=data;
    });

    this.formCliente = this.fb.group({
      'documento': [this.documento, [Validators.required,Validators.minLength(4),Validators.maxLength(16)], this.validadoresService.existeUsuario],
      'rsocial': ['', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'direccion': ['',[Validators.required,Validators.minLength(3),Validators.maxLength(32)]],
      'telefono': ['',[Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'celular': ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'correo': ['',[ Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      'empleados': ['',[Validators.required,Validators.minLength(1),Validators.maxLength(4),Validators.pattern('^[0-9]+$')]]

    });

  }

  get documentoNoValido() {
    return this.formCliente.get('documento')?.invalid && this.formCliente.get('documento')?.touched
  }
  get rsocialNoValido() {
    return this.formCliente.get('rsocial')?.invalid && this.formCliente.get('rsocial')?.touched
  }
  get direccionNoValido() {
    return this.formCliente.get('direccion')?.invalid && this.formCliente.get('direccion')?.touched
  }
  get telefonoNoValido() {
    return this.formCliente.get('telefono')?.invalid && this.formCliente.get('telefono')?.touched
  }
  get celularNoValido() {
    return this.formCliente.get('celular')?.invalid && this.formCliente.get('celular')?.touched
  }
  get correoNoValido() {
    return this.formCliente.get('correo')?.invalid && this.formCliente.get('correo')?.touched
  }
  get empleadosNoValido() {
    return this.formCliente.get('empleados')?.invalid && this.formCliente.get('empleados')?.touched
  }



  validarNumeros(event: KeyboardEvent) {
    const input = event.key;
    const regex = /[0-9]/;
    if (!regex.test(input)) {
      event.preventDefault();
    }
  }

  guardarCliente(){
  if ( this.formCliente.invalid ) {

    console.log('El formulario es inválido. No se puede guardar.');
  } else {

   
    let tipo = new TipoDocumento
    tipo.tipoDoc = this.tipoDocumento;

    let divi = new Divipola
    divi.idZona = this.divipola;

    let cli = new Cliente();
    cli.tipoDocumento = tipo;
    cli.nroDocumento = this.formCliente.value['documento'];
    cli.divipola = divi;
    cli.razonSocial = this.formCliente.value['rsocial'];
    cli.direccion = this.formCliente.value['direccion'];
    cli.telefonoFijo = this.formCliente.value['telefono'];
    cli.telefonoCelular = this.formCliente.value['celular'];
    cli.correo = this.formCliente.value['correo'];
    cli.cantidadEmpleados = this.formCliente.value['empleados'];
    cli.usuario = this.usuario;
    cli.ley1581 = false;
    cli.fechaHoraSistema = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    cli.ip = this.loginService.agenteDTO.hostIp;

    this.clienteService.guardarCliente(cli).subscribe(() =>{
      this.clienteService.setMensajecambio('SE REGISTRÓ');
      this.router.navigate(['filtroEntrante']);
    });
  }
  }

  cancelarCliente(){

    this.formCliente.reset({
      'documento':'',
      'rsocial': '',
      'direccion': '',
      'telefono': '',
      'celular': '',
      'empleados': ''

    });

      
  }
 
}
