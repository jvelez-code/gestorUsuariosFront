 import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

 interface ErrorValidate {
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  existeUsuario( control: FormControl ): Promise<any> | Observable <any> {

    console.log(control, 'formulario')
    if( !control.value ) {
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {

      setTimeout(() => {
        
        if ( control.value === '8080808080' ) {
          resolve({ existe: true });
        } else {
          resolve( null );
        }

      }, 3500);


    });

  }

  passwordsIguales(pass1Name: string , pass2Name: string ){
    return(formGroup: FormGroup) =>{
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      console.log('holamundo1')
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
        console.log('holamundo2')
      } else {
        pass2Control.setErrors({noEsIgual:true});
        console.log('holamundo3')
      }
    }
    

  }


}
