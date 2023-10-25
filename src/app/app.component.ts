import { Component } from '@angular/core';
import { Menu } from './_model/menu';
import { AskEstadoExtensionService } from './_services/ask-estado-extension.service';
import { LoginService } from './_services/login.service';
import { LlamadaEntranteService } from './_services/llamada-entrante.service';
import { AskEstadoService } from './_services/ask-estado.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestorUsuarioFront';
  
  menus!: Menu[];
  estadoExt !:number;
  idExt !:number;
  usuarioExt !:string;
  enllamada !: boolean;

  constructor(
    public loginService: LoginService,
    private askEstadoExtensionService : AskEstadoExtensionService,
    private llamadaEntranteService : LlamadaEntranteService,
    private askEstadoService : AskEstadoService
  ) { 
    this.loginService.getExtensionCambio().subscribe(data =>{
      this.idExt=data;
    });

    this.loginService.getUsuariosCambio().subscribe(data =>{
      this.usuarioExt=data;
    });
  }

  ngOnInit() {
    this.loginService.getMenuCambio().subscribe(data=>{
       this.menus= data;
    });
  }

  cerrarApp(){

    if(this.loginService.agenteDTO.idUsuario){
    
    const askEstadoExtension = 
      { estadoAsk : 1 , idExtension : this.idExt, loginAgente: this.usuarioExt,
      nroDocumento: this.loginService.agenteDTO.nroDocumento }

    this.llamadaEntranteService.buscarLlamada(askEstadoExtension).subscribe(data =>{      
      this.enllamada=data;
  
    if(this.enllamada) {
      this.askEstadoService.setMensajecambio('EN LLAMADA')


    } else {
    this.askEstadoExtensionService.actualizarEstadoExt(askEstadoExtension).subscribe(()=>{})
    
    this.loginService.cerrarSesion();
    
    }
   })

  }
  else{
    this.loginService.cerrarSesion();
  }
  }
}
