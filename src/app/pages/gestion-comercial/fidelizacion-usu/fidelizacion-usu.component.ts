import { Component ,  Inject ,  OnInit } from '@angular/core';
import { Form ,  FormBuilder ,  FormGroup ,  Validators } from '@angular/forms';
import { MAT_DIALOG_DATA ,  MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { GestionComercialDto } from 'src/app/_dto/GestionComercialDto';
import { Cliente } from 'src/app/_model/cliente';
import { DetalleGestionComercial } from 'src/app/_model/detalleGestionComercial';
import { FidelizacionComercial } from 'src/app/_model/fidelizacionComercial';
import { Usuario } from 'src/app/_model/usuario';
import { ClienteService } from 'src/app/_services/cliente.service';
import { FidelizacionService } from 'src/app/_services/fidelizacion.service';
import { ValidadoresService } from 'src/app/_services/validadores.service';

@Component({
  selector: 'app-fidelizacion-usu' , 
  templateUrl: './fidelizacion-usu.component.html' , 
  styleUrls: ['./fidelizacion-usu.component.css']
})
export class FidelizacionUsuComponent implements OnInit {

  formFideli !: FormGroup;
  gestionC !: GestionComercialDto;

  constructor(
    private fidelizacionService : FidelizacionService , 
    private validadoresService : ValidadoresService , 
    private dialogRef: MatDialogRef<FidelizacionUsuComponent> , 
    @Inject(MAT_DIALOG_DATA) private data: GestionComercialDto , 
    private fb : FormBuilder , 
    private snackBar: MatSnackBar , 
    private router: Router )
    {
      this.crearFormulario();
    }


    ngOnInit(): void {

    this.gestionC = new GestionComercialDto();
    this.gestionC.idDetalleGestionComercial = this.data.idDetalleGestionComercial;
    this.gestionC.tipoDocumentoCliente = this.data.tipoDocumentoCliente;
    this.gestionC.nroDocumentoCliente = this.data.nroDocumentoCliente;

    }

  crearFormulario(){

    this.formFideli = this.fb.group({      
      'tipoDoc': [this.data.tipoDocumentoCliente  ,  [Validators.required]] , 
      'documento': [this.data.nroDocumentoCliente  ,  [Validators.required , Validators.minLength(7) , Validators.maxLength(10) , Validators.pattern('^[0-9]+$')]] , 
      'codCaja': ['SIN CCF' ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(64)]] , 
      'regNuevos': ['1' , [Validators.required , Validators.minLength(10) , Validators.maxLength(10) , Validators.pattern('^[0-9]+$')]] , 
      'regRecuperados' : ['0' ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(64)]] , 
      'fechaPago' : ['2023-12-01' ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(64)]] , 
      'numPlanilla': ['8627928921' , [Validators.required , Validators.minLength(1) , Validators.maxLength(4) , Validators.pattern('^[0-9]+$')]] , 
      'observacion' : ['INDEPENDIENTE PAGADO' ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(64)]] , 
      'migracion' : ['0' ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(64)]] , 
      'sucursal' : ['2' ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(64)]] , 
       });

  }

  guardarFidelizacion(){





    let detalleGestionComercial = new DetalleGestionComercial();
    detalleGestionComercial.idDetalleGestionComercial = this.data.idDetalleGestionComercial;

    let cliente = new Cliente();
    cliente.idCliente = this.data.idCliente;

    let usuario = new Usuario();
    usuario.idUsuario = this.data.idAgente!;
    // Aserción no nula (!):

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
