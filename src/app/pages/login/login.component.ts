import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AskEstadoExtension } from "src/app/_model/askEstadoExtension";
import { AgenteCampanaService } from "src/app/_services/agente-campana.service";
import { AskEstadoExtensionService } from "src/app/_services/ask-estado-extension.service";
import { LoginService } from "src/app/_services/login.service";
import { MenuService } from "src/app/_services/menu.service";
import { UsuarioService } from "src/app/_services/usuario.service";
import { environment } from "src/environments/environment";
import "../../../assets/login-animation.js";
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import * as moment from "moment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, AfterViewInit {
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

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
    
    const filtroEntranteDTO = { loginAgente: this.usuario };

    this.usuarioService.loginValidacion(filtroEntranteDTO).subscribe((data) => {
      if (data === null) {
        this.mensaje = "Por favor, contacta al administrador del sistema.";
        return;
      }
      this.fechaVencimiento = new Date(
        moment(data.fechaCambio).format("YYYY-MM-DD HH:mm:ss")
      );

      if (data.enabled === false) {
        this.mensaje = "Por favor, contacta al administrador del sistema.";
        return;
      } else if (this.fechaVencimiento < this.fechaActual) {
        this.mensaje =
          "Contraseña expirada. Por favor, actualízala para continuar.";
        return;
      } else if (this.captchaVerified || !this.captchaactivo) {
        sessionStorage.clear();
        
        this.loginService.login(this.usuario, this.clave).subscribe((data) => {
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

          this.usuarioService
            .buscarAgenteCampana(filtroEntranteDTO)
            .subscribe((data) => {
              this.loginService.agenteDTO = data;
              console.log(data);
            });

          this.menuService
            .listarPorUsuario(decodedToken.user_name)
            .subscribe((data) => {
              this.loginService.setMenuCambio(data);
              this.router.navigate(["estadoExtension"]);
            });
        });
      }else{
        this.setMensajeInformativo("Por favor, complete el captcha.");
      }
    });
  }

  ngAfterViewInit() {

    const randomNumber = Math.floor(Math.random() * 13) + 1;
    const bodyElement = document.getElementById("bodylogin");
    const backgroundImage = `url('assets/fondos/fondo${randomNumber}.jpg')`;
    
    if (bodyElement) {
      bodyElement.style.backgroundImage = backgroundImage;
      bodyElement.style.backgroundRepeat = "no-repeat";
      bodyElement.style.backgroundSize = "cover";
     
    }
    
    // Usar una media query para ajustar la imagen en pantallas pequeñas
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (bodyElement) {
        bodyElement.style.backgroundSize = "contain"; // Otra opción para imágenes más pequeñas
      }
    }
    
  }
}