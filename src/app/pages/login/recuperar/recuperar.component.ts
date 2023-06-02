import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
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
        this.error = "El usuario ingresado no existes";
        this.porcentaje = 0;
      }
    });
  }



}
