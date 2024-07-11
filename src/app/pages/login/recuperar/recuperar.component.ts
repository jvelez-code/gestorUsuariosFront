import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LoginService } from 'src/app/_services/login.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';

@Component({
    selector: 'app-recuperar',
    templateUrl: './recuperar.component.html',
    styleUrls: ['./recuperar.component.scss'],
    standalone: true,
    imports: [MatFormField, MatInput, ReactiveFormsModule, FormsModule, MatProgressBar, MatButton, MatToolbar, RouterOutlet]
})
export class RecuperarComponent {


  email !: string;
  mensaje !: string;
  error !: string;
  porcentaje: number = 0;

  constructor(
    private loginService : LoginService
    ,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  enviar(){
    this.porcentaje = 20;
    this.loginService.enviarCorreo(this.email).subscribe(data => {
        if(data === 1){
        this.mensaje = "Se enviaron las indicaciones al correo."
        this.error = ''
        this.porcentaje = 100;
      }else{
        this.error = "El usuario ingresado no existe";
        this.porcentaje = 0;
      }
    });
  }



}
