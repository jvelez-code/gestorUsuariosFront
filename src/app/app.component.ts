import { Component } from '@angular/core';
import { Menu } from './_model/menu';
import { AskEstadoExtensionService } from './_services/ask-estado-extension.service';
import { LoginService } from './_services/login.service';

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

  constructor(
    public loginService: LoginService,
    private askEstadoExtensionService : AskEstadoExtensionService
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
    const askEstadoExtension ={ estadoAsk : 1 , idExtension : this.idExt, loginAgente: this.usuarioExt }
    this.askEstadoExtensionService.actualizarEstadoExt(askEstadoExtension).subscribe(()=>{})
    
    this.loginService.cerrarSesion();
  }
}
