import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ValidadoresService } from 'src/app/_services/validadores.service';

@Component({
  selector: 'app-fidelizacion-usu',
  templateUrl: './fidelizacion-usu.component.html',
  styleUrls: ['./fidelizacion-usu.component.css']
})
export class FidelizacionUsuComponent {

  formFideli !: FormGroup;

  constructor(
    private validadoresService : ValidadoresService,
    private fb : FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router ){

  }

  crearFormulario(){

    this.formFideli = this.fb.group({
      'rsocial': ['', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'direccion': ['',[Validators.required,Validators.minLength(3),Validators.maxLength(32)]],
      'telefono': ['',[Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'celular': ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'correo': ['',[ Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      'empleados': ['',[Validators.required,Validators.minLength(1),Validators.maxLength(4),Validators.pattern('^[0-9]+$')]]

    });

  }

  guardarFidelizacion(){

  }


}
