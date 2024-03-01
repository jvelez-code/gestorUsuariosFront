import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-secretaria-virtual',
  templateUrl: './secretaria-virtual.component.html',
  styleUrls: ['./secretaria-virtual.component.css']
})
export class SecretariaVirtualComponent implements OnInit{

  formSecretaria !: FormGroup;

 constructor( private fb: FormBuilder ) 
 { 
  this.crearFormulario();
 }

   
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  crearFormulario(){
    this.formSecretaria = this.fb.group({
      tipoDoc : ['CC'],
      documento : ['8080'],

    });
  }

  buscarSecreVirt(){
    
    console.log('Pruebas secretaria')
  }

}
