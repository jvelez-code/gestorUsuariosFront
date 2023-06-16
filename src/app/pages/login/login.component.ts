import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AskEstadoExtension } from 'src/app/_model/askEstadoExtension';
import { AgenteCampanaService } from 'src/app/_services/agente-campana.service';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { LoginService } from 'src/app/_services/login.service';
import { MenuService } from 'src/app/_services/menu.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { environment } from 'src/environments/environment';
import '../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  usuario!: string;
  clave!: string;
  mensaje!: string;
  error!: string;
  loginAgente!: string;
  showError: boolean = false;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private usuarioService : UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion() {

      sessionStorage.clear();
   
      this.loginService.login(this.usuario, this.clave).subscribe(data =>{

      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      const helper = new JwtHelperService();

      let decodedToken = helper.decodeToken(data.access_token);
      this.loginService.setUsuariosCambio(decodedToken.user_name);

      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data=>{
        this.loginService.setMenuCambio(data);        
        this.router.navigate(['estadoExtension']);
      });

      const askEstadoExtension = { loginAgente : decodedToken.user_name }
      const filtroEntranteDTO  = { loginAgente : decodedToken.user_name }

      this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe((data:any) =>{
         this.loginService.setExtensionCambio(data.idExtension);
      });

      this.usuarioService.buscarAgenteCampana(filtroEntranteDTO).subscribe(data =>{
        this.loginService.agenteDTO=data;
      });
      
     }
    
    );

  }

  logoutPreviousSession() {
    // Lógica para cerrar la sesión anterior, si es necesario
    // Por ejemplo, realizar una solicitud al backend para invalidar la sesión anterior

    console.log('HOLA MUNDO')
  }





  ngAfterViewInit() {
    const randomNumber = Math.floor(Math.random() * 13) + 1;
    const bodyElement = document.getElementById('bodylogin');
    const backgroundImage = `url('assets/fondos/fondo${randomNumber}.jpg')`;
  
    if (bodyElement) {
      bodyElement.style.backgroundImage = backgroundImage;
      bodyElement.style.backgroundRepeat = 'no-repeat';
      bodyElement.style.backgroundSize = 'cover';
    }
    
  }
  

}