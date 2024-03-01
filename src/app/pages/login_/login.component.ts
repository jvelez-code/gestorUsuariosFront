import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing/index.js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AskEstadoExtension } from 'src/app/_model/askEstadoExtension';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { LoginService } from 'src/app/_services/login.service';
import { MenuService } from 'src/app/_services/menu.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { environment } from 'src/environments/environment';
import '../../../assets/login-animation_.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario!: string;
  clave!: string;
  mensaje!: string;
  error!: string;
  loginAgente!: string;

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
    this.loginService.login(this.usuario, this.clave).subscribe(data =>{
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      const helper = new JwtHelperService();

      let decodedToken = helper.decodeToken(data.access_token);
      this.loginService.setUsuariosCambio(decodedToken.user_name);

      const parametrosDTO ={  loginAgente : decodedToken.user_name }
        this.usuarioService.buscarAgenteCampana(parametrosDTO).subscribe(data=>{
        this.loginService.setagenteCampanaCambio(data);
        this.loginService.AgenteDTO=data;
      });    

      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data=>{
        this.loginService.setMenuCambio(data);        
        this.router.navigate(['estadoExtension']);
      });



      const askEstadoExtension ={ loginAgente : decodedToken.user_name }

      this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe((data:any) =>{
         this.loginService.setExtensionCambio(data.idExtension);
      });
      
    });

  }

  ngAfterViewInit() {
    (window as any).initialize();
  }
}
