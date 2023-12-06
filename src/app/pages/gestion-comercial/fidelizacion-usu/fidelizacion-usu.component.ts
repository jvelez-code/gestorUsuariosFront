import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Cliente } from 'src/app/_model/cliente';
import { DetalleGestionComercial } from 'src/app/_model/detalleGestionComercial';
import { FidelizacionComercial } from 'src/app/_model/fidelizacionComercial';
import { Usuario } from 'src/app/_model/usuario';
import { ClienteService } from 'src/app/_services/cliente.service';
import { FidelizacionService } from 'src/app/_services/fidelizacion.service';
import { ValidadoresService } from 'src/app/_services/validadores.service';

@Component({
  selector: 'app-fidelizacion-usu',
  templateUrl: './fidelizacion-usu.component.html',
  styleUrls: ['./fidelizacion-usu.component.css']
})
export class FidelizacionUsuComponent {

  formFideli !: FormGroup;

  constructor(
    private fidelizacionService : FidelizacionService,
    private validadoresService : ValidadoresService,
    private dialogRef: MatDialogRef<FidelizacionUsuComponent>,
    private fb : FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router )
    {
      this.crearFormulario();
    }

  crearFormulario(){

    this.formFideli = this.fb.group({      
      'tipoDoc': ['CC',[Validators.required]],
      'documento': ['8080',[Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'codCaja': ['SIN CCF', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'regNuevos': ['1',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'regRecuperados' : ['0', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'fechaPago' : ['2023-12-01', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'numPlanilla': ['8627928921',[Validators.required,Validators.minLength(1),Validators.maxLength(4),Validators.pattern('^[0-9]+$')]],
      'observacion' : ['INDEPENDIENTE PAGADO', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'migracion' : ['0', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'sucursal' : ['2', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
       });

  }

  guardarFidelizacion(){

    let detalleGestionComercial = new DetalleGestionComercial();
    detalleGestionComercial.idDetalleGestionComercial = 210266;

    let cliente = new Cliente();
    cliente.idCliente = 1966545;

    let usuario = new Usuario();
    usuario.idUsuario = 457;

    let fide = new FidelizacionComercial();
    fide.idDetalleGestionComercial = detalleGestionComercial;
    fide.idCliente = cliente;
    fide.idUsuario = usuario;
    fide.codCaja = this.formFideli.value['codCaja'];
    fide.registrosNuevos = this.formFideli.value['regNuevos'];
    fide.registrosRecuperados = this.formFideli.value['regRecuperados'];
    fide.fechaPago = this.formFideli.value['fechaPago'];
    fide.numeroPlanilla = this.formFideli.value['numPlanilla'];
    fide.observacion = this.formFideli.value['observacion'];
    fide.migracion = this.formFideli.value['migracion'];
    fide.sucursal = this.formFideli.value['sucursal'];
    fide.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    this.fidelizacionService.registrar(fide).subscribe(()=>
    
    console.log('hola fidelizacion')
    
    );
    
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }



}
