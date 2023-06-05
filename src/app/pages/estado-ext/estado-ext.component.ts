import { ContentObserver } from '@angular/cdk/observers';
import { Component, INJECTOR, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AskEstado } from 'src/app/_model/askEstado';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { AskEstadoService } from 'src/app/_services/ask-estado.service';
import { LoginService } from 'src/app/_services/login.service';



@Component({
  selector: 'app-extado-ext',
  templateUrl: './estado-ext.component.html',
  styleUrls: ['./estado-ext.component.css']
})
export class ExtadoExtComponent implements OnInit {

  estadoExt !:number;
  idExt !:number;
  usuarioExt !:string;
  llamada !:boolean;
  
  askEstados$ !: Observable<AskEstado[]>;

  constructor (
    private askEstadoService: AskEstadoService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  )
  {}



  ngOnInit(): void {
   /* this.askEstadoService.buscar().subscribe(data=>{
      console.log(data);
    });*/
    this.askEstados$=this.askEstadoService.buscar();

    this.loginService.getExtensionCambio().subscribe(data =>{
      this.idExt=data;
    });

    this.loginService.getUsuariosCambio().subscribe(data =>{
      this.usuarioExt=data;
    });

    this.askEstadoService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });


  }




  
  cambioExt(){
    console.log('Hola Mundo en llamada1');
    if(this.estadoExt===3){
      console.log('Hola Mundo en llamada2');
    }
    else{
      console.log('Hola Mundo en llamada3');

    if(this.estadoExt===2){
      this.llamada=true;

      if(this.llamada){
        console.log('Hola Mundo con logueo');

      }else {
        console.log('Hola Mundo sin logueo');
      }
      
    }
    const askEstadoExtension ={ estadoAsk : this.estadoExt, idExtension : this.idExt, loginAgente: this.usuarioExt }
    this.askEstadoExtensionService.actualizarEstadoExt(askEstadoExtension).subscribe(data=>{
      
      if ( this.estadoExt == 4 || this.estadoExt == 5 || this.estadoExt == 6 || this.estadoExt == 7 || 
          this.estadoExt == 8 || this.estadoExt == 9 || this.estadoExt == 10 || this.estadoExt == 13 ) {
            
        this.loginService.cerrarSesion(); 
        
              }
        else if ( this.estadoExt == 11 || this.estadoExt == 15 || this.estadoExt == 16 ||
           this.estadoExt == 17 || this.estadoExt == 18 ){

          this.askEstadoService.setMensajecambio('SE ACTUALIZÓ')         
        }
      
    
    });
  }
  }
}
