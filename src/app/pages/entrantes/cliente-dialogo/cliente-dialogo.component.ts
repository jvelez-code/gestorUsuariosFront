import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_services/cliente.service';

@Component({
  selector: 'app-cliente-dialogo',
  templateUrl: './cliente-dialogo.component.html',
  styleUrls: ['./cliente-dialogo.component.css']
})
export class ClienteDialogoComponent implements OnInit{
  
  cliente !: Cliente;
  idCliente !: number;
  formClienteMod !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private dialogRef: MatDialogRef<ClienteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cliente,
    private clienteService: ClienteService
    ){
    this.crearFormulario()
    }

  ngOnInit(): void {
      this.cliente = new Cliente();
      this.cliente.idCliente = this.data.idCliente;
      this.cliente.tipoDocumento = this.data.tipoDocumento;
      this.cliente.nroDocumento = this.data.nroDocumento;
      this.cliente.razonSocial = this.data.razonSocial;
      this.cliente.direccion = this.data.direccion;
      this.cliente.correo = this.data.correo;
      this.cliente.telefonoCelular = this.data.telefonoCelular;
      this.cliente.telefonoFijo = this.data.telefonoFijo;
      this.cliente.cantidadEmpleados = this.data.cantidadEmpleados;
      this.cliente.fechaHoraSistema = this.data.fechaHoraSistema;
      this.cliente.ip = this.data.ip;
      this.cliente.usuario = this.data.usuario;
      this.cliente.ley1581 = this.data.ley1581;
      this.cliente.divipola = this.data.divipola;
      
      this.cargarDataForm();
  }

  operar(){

    
    if(this.cliente != null) {
    
    this.cliente.razonSocial = this.formClienteMod.value['nombre'];
    this.cliente.correo = this.formClienteMod.value['correo'];
    this.cliente.telefonoCelular = this.formClienteMod.value['telCelular'];
    this.cliente.telefonoFijo = this.formClienteMod.value['telPrincipal'];
    
      this.clienteService.modificar(this.cliente).pipe(switchMap(() =>{
        const cliente= { idCliente:this.cliente.idCliente || 0 }
        return this.clienteService.clientePorId(cliente);
      })).subscribe(data => {
        this.clienteService.setClienteCambio(data)
      });
    }
    this.cerrar();
  }


  cerrar(){
    this.dialogRef.close();
  }

  crearFormulario(){

    this.formClienteMod = this.fb.group({
      'nombre': ['', [Validators.required,Validators.minLength(4),Validators.maxLength(16)]],
      'correo': ['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      'telPrincipal': ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'telCelular': ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
  });
  }

  get nombreNoValido() {
    return this.formClienteMod.get('nombre')?.invalid && this.formClienteMod.get('nombre')?.touched
  }
  get correoNoValido() {
    return this.formClienteMod.get('correo')?.invalid && this.formClienteMod.get('correo')?.touched
  }
  get telPrincipalNoValido() {
    return this.formClienteMod.get('telPrincipal')?.invalid && this.formClienteMod.get('telPrincipal')?.touched
  }
  get telCelularNoValido() {
    return this.formClienteMod.get('telCelular')?.invalid && this.formClienteMod.get('telCelular')?.touched
  }


  validarNumeros(event: KeyboardEvent) {
    const input = event.key;
    const regex = /[0-9]/;
    if (!regex.test(input)) {
      event.preventDefault();
    }
  }

  cargarDataForm(){
    this.formClienteMod.reset({
      nombre: this.cliente.razonSocial,
      telPrincipal: this.cliente.telefonoFijo,
      telCelular: this.cliente.telefonoCelular,
      correo: this.cliente.correo
    })
  }



}
