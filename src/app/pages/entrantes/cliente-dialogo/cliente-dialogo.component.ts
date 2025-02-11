import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, switchMap } from 'rxjs';
import { DivipolaDTO } from 'src/app/_dto/divipolaDTO ';
import { Cliente } from 'src/app/_model/cliente';
import { Divipola } from 'src/app/_model/divipola';
import { ClienteService } from 'src/app/_services/cliente.service';
import { DivipolaService } from 'src/app/_services/divipola.service';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-cliente-dialogo',
    templateUrl: './cliente-dialogo.component.html',
    styleUrls: ['./cliente-dialogo.component.scss'],
    imports: [MatCard,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatSelect,
        MatOption,
        MatButton,
        AsyncPipe]
})
export class ClienteDialogoComponent implements OnInit {
  
  cliente !: Cliente;
  idCliente !: number;
  divipola !: number;
  divi!:Divipola;
  divipola$ !: Observable<DivipolaDTO[]>;
  formClienteMod !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private divipolaService : DivipolaService,
    private dialogRef: MatDialogRef<ClienteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cliente,
    private clienteService: ClienteService
    ){
    this.crearFormulario()
    }

  ngOnInit(): void {
      this.divipola$= this.divipolaService.buscar();

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

      this.divipola=this.cliente.divipola?.idZona ?? 184;
      
      this.cargarDataForm();
  }

  operar(){

    this.divipolaService.listarPorId(this.divipola).subscribe(data =>{

      let divi = new Divipola
      divi.idZona = data.idZona;
      divi.indicativo= data.indicativo;
      divi.codigo=data.codigo;
      divi.tipoZona=data.tipoZona;
      divi.tipoEt=data.tipoEt;
      divi.nombre=data.nombre;
      divi.idZonapadre=data.idZonapadre;
      divi.dv=data.dv;
      divi.zonaEspecial=data.zonaEspecial;

    
    if(this.cliente != null) {
    
      this.cliente.razonSocial = this.formClienteMod.value['nombre'];
      this.cliente.correo = this.formClienteMod.value['correo'];
      this.cliente.telefonoCelular = this.formClienteMod.value['telCelular'];
      this.cliente.telefonoFijo = this.formClienteMod.value['telPrincipal'];
      this.cliente.divipola=divi
  
      
        this.clienteService.modificar(this.cliente).pipe(switchMap(() =>{
          const cliente= { idCliente:this.cliente.idCliente || 0 }
          return this.clienteService.clientePorId(cliente);
        })).subscribe(data => {
          this.clienteService.setClienteCambio(data)
        });
      }
  

    })

   
    this.cerrar();
  }



  crearFormulario(){

    this.formClienteMod = this.fb.group({
      'nombre': ['', [Validators.required,Validators.minLength(4),Validators.maxLength(64)]],
      'correo': ['',[ Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      'telPrincipal': ['',[Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'telCelular': ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'ciudad': ['',[]],
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

  cerrar(){
    this.dialogRef.close();
  }




}
