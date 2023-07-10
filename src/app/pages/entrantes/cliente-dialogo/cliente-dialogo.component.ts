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
  ) { }

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


  }

  operar(){
    if(this.cliente != null) {
      this.clienteService.modificar(this.cliente).pipe(switchMap(() =>{
        const cliente= { idCliente:this.cliente.idCliente || 0 }
        return this.clienteService.clientePorId(cliente);
      })).subscribe(data => {
        console.log(data,'cliente-dialog')
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
      'rsocial': ['', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'correo': ['',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      'celular': ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'telefono': ['',[Validators.required,Validators.minLength(7),Validators.maxLength(7),Validators.pattern('^[0-9]+$')]]     
  });
  }

  get rsocialNoValido() {
    return this.formClienteMod.get('rsocial')?.invalid && this.formClienteMod.get('rsocial')?.touched
  }
  get telefonoNoValido() {
    return this.formClienteMod.get('telefono')?.invalid && this.formClienteMod.get('telefono')?.touched
  }
  get celularNoValido() {
    return this.formClienteMod.get('celular')?.invalid && this.formClienteMod.get('celular')?.touched
  }
  get correoNoValido() {
    return this.formClienteMod.get('correo')?.invalid && this.formClienteMod.get('correo')?.touched
  }




}
