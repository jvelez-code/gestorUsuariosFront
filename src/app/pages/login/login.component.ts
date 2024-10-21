import { Component, AfterViewInit, ElementRef, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AskEstadoExtensionService } from "src/app/_services/ask-estado-extension.service";
import { LoginService } from "src/app/_services/login.service";
import { MenuService } from "src/app/_services/menu.service";
import { UsuarioService } from "src/app/_services/usuario.service";
import { environment } from "src/environments/environment";
import * as moment from "moment";
import { MatCard } from "@angular/material/card";
import { NgHcaptchaModule } from "ng-hcaptcha";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FestivosService } from "src/app/_services/festivos.service";
import { EmpresaService } from "src/app/_services/empresa.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgHcaptchaModule,
        RouterLink,
        MatCard,
        CommonModule
    ],
})
export class LoginComponent implements OnInit  {


  usuario!: string;
  clave!: string;
  mensaje!: string;
  error!: string;
  loginAgente!: string;
  showError: boolean = false;
  fechaActual: Date = new Date(moment().format("YYYY-MM-DD HH:mm:ss"));
  fechaVencimiento!: Date;
  mensajecaptcha!: string;
  captchaVerified: boolean = false;
  captchaactivo: boolean = true;
  vercontrasena: boolean = false;
  gestorUrl: string =  `${environment.CORREO}/#/recuperar`



  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private festivosService: FestivosService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private elementRef: ElementRef 
  ) {}


  ngOnInit(): void {
    sessionStorage.clear();
  }

  contrasenaVisible(): void {
    this.vercontrasena = !this.vercontrasena;
    const passwordField = this.elementRef.nativeElement.querySelector('#password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.vercontrasena ? 'text' : 'password';
    }
  }

 

  onVerify(token: string) {
    console.log("El captcha es valido");
    this.captchaVerified = true;
  }

  onExpired(response: any) {
    console.log("se expiro el captcha");
  }

  onError(error: any) {
    console.log("ocurrio un error con el captcha");
  }

  setMensajeInformativo(mensaje: string) {
    this.mensajecaptcha = mensaje;
  }

  iniciarSesion() {
    sessionStorage.clear();


    this.loginService.setUsuariosCambio(this.usuario);
    
    const filtroEntranteDTO = { loginAgente: this.usuario };

    this.usuarioService.loginValidacion(filtroEntranteDTO).subscribe((data) => {
      
      if (data === null) {
        this.mensaje = "Por favor, contacta al administrador del sistema.";
        return;
      }
      this.fechaVencimiento = new Date(
        moment(data.fechaCambio).format("YYYY-MM-DD HH:mm:ss")
      );

      // INTENTOS FALLIDOS
      if (data.failed && data.failed > 2 ) {
        this.mensaje = "Intentos Fallidos, Contactar al adminisrador";
        return;        
      } 
      // USUARIO ACTIVO
      if (data.enabled === false) {
        this.mensaje = " Usuario Inactivo, Contactar al adminisrador";
        return;
        
      }  // USUARIO FECHA VENCIMIENTO
      if (this.fechaVencimiento < this.fechaActual) {
        this.mensaje ="Contraseña expirada. Por favor, actualízala para continuar.";
        return;
      }
      if (this.captchaVerified && this.captchaactivo) {
        this.usuarioService.setUsuariosCambio(data);
        this.iniciarSesionUsuario();       
        
      } else {
        this.setMensajeInformativo("Por favor, complete el captcha.");
      }
    });
  }


    // Función para iniciar sesión del usuario
    iniciarSesionUsuario() {
      sessionStorage.clear();
      
  
      this.loginService.login(this.usuario, this.clave).subscribe({
        next: (data) => {
          sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
          const helper = new JwtHelperService();

          let decodedToken = helper.decodeToken(data.access_token);
          this.loginService.setUsuariosCambio(decodedToken.user_name);
          const askEstadoExtension = { loginAgente: decodedToken.user_name };
          const filtroEntranteDTO = { loginAgente: decodedToken.user_name };

          this.askEstadoExtensionService
            .buscarxAgentes(askEstadoExtension)
            .subscribe((data: any) => {
              this.loginService.setExtensionCambio(data.idExtension);
              this.loginService.agenteASK = data;
            });

          this.usuarioService.buscarAgenteCampana(filtroEntranteDTO).subscribe((data) => {
              console.log(data,'login dto')
              this.loginService.agenteDTO = data;              
              this.empresaService.setEmpresaCambio(data.pseudonimo ?? '' );
            
              
              
            });

          this.menuService
            .listarPorUsuario(decodedToken.user_name)
            .subscribe((data) => {
              this.loginService.setMenuCambio(data);
              this.router.navigate(["intro"]);
            });

        this.festivosService.listar().subscribe(data => {
          this.festivosService.festivos = data;
        });

         this.loginService.setUltimoCambio(this.fechaActual);
         this.loginService.actualizarIntento(filtroEntranteDTO).subscribe(()=>{
          
         });
        },
        error: (error) => {
          // Manejar el error aquí
          console.error("Error al iniciar sesión:", error);
          if (error.status === 400 && error.error.error === "invalid_grant") {
            this.mensaje = "Credenciales inválidas. Por favor, verifica tu nombre de usuario y contraseña.";
          } else {
            this.mensaje = "Error al iniciar sesión. Por favor, intenta nuevamente más tarde.";
          }
        }
      });
    }

  
}


