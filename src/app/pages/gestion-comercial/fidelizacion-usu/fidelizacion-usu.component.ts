import { Component ,  Inject ,  OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { MatButton } from '@angular/material/button';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-fidelizacion-usu',
    templateUrl: './fidelizacion-usu.component.html',
    styleUrls: ['./fidelizacion-usu.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatCardActions, MatButton]
})
export class FidelizacionUsuComponent implements OnInit {

  formFideli !: FormGroup;
  gestionC !: GestionComercialDto;
  fechaSeleccionada: Date = new Date();

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
      'tipoDoc': [this.data.tipoDocumentoCliente ] , 
      'documento': [this.data.nroDocumentoCliente  ] , 
      'codCaja': ['SIN CCF' ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(8)]] , 
      'regNuevos': ['1' , [Validators.required , Validators.minLength(1) , Validators.maxLength(4) , Validators.pattern('^[0-9]+$')]] , 
      'regRecuperados' : ['0' ,  [Validators.required , Validators.minLength(1) , Validators.maxLength(4)]] , 
      'fechaPago' : ['' ,[Validators.required, this.validadoresService.validatetipo ]] , 
      'numPlanilla': ['86' , [Validators.required , Validators.minLength(6) , Validators.maxLength(16) , Validators.pattern('^[0-9]+$')]] , 
      'observacion' : ['PAGADA' ,  [Validators.required , Validators.minLength(3) , Validators.maxLength(64)]] , 
      'migracion' : ['0' ,  [Validators.required , Validators.minLength(1) , Validators.maxLength(4), Validators.pattern('^[0-9]+$')]] , 
      'sucursal' : ['0' ,  [Validators.required , Validators.minLength(1) , Validators.maxLength(4), Validators.pattern('^[0-9]+$')]] , 
       });

  }

  get codCajaNoValido() {
    return this.formFideli.get('codCaja')?.invalid && this.formFideli.get('codCaja')?.touched
  }
  get regNuevosNoValido() {
    return this.formFideli.get('regNuevos')?.invalid && this.formFideli.get('regNuevos')?.touched
  }
  get regRecuperadosNoValido() {
    return this.formFideli.get('regRecuperados')?.invalid && this.formFideli.get('regRecuperados')?.touched
  }
  get fechaPagoNoValido() {
    return this.formFideli.get('fechaPago')?.invalid && this.formFideli.get('fechaPago')?.touched
  }
  get numPlanillaNoValido() {
    return this.formFideli.get('numPlanilla')?.invalid && this.formFideli.get('numPlanilla')?.touched
  }
  get observacionNoValido() {
    return this.formFideli.get('observacion')?.invalid && this.formFideli.get('observacion')?.touched
  }
  get migracionNoValido() {
    return this.formFideli.get('migracion')?.invalid && this.formFideli.get('migracion')?.touched
  }
  get sucursalNoValido() {
    return this.formFideli.get('sucursal')?.invalid && this.formFideli.get('sucursal')?.touched
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
    fide.fechaPago = moment(this.fechaSeleccionada).format('YYYY-MM-DD');
    fide.numeroPlanilla = this.formFideli.value['numPlanilla'];
    fide.observacion = this.formFideli.value['observacion'];
    fide.migracion = this.formFideli.value['migracion'];
    fide.sucursal = this.formFideli.value['sucursal'];
    fide.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

    this.fidelizacionService.registrar(fide).subscribe(()=>{
      this.snackBar.open("SE REGISTRO", "Aviso", { duration: 2000 });
    });
    
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }



}
