import { Component } from '@angular/core';
import { Menu } from './_model/menu';
import { AskEstadoExtensionService } from './_services/ask-estado-extension.service';
import { LoginService } from './_services/login.service';
import { AskEstadoService } from './_services/ask-estado.service';
import * as moment from 'moment';
import { ParametrosDTO } from './_dto/ParametrosDTO';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './_services/usuario.service';
import { UsuariosMigraService } from './_services/usuarios-migra.service';
import { switchMap } from 'rxjs';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatDivider } from '@angular/material/divider';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [MatToolbar, MatIconButton, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, RouterLink, MatSidenavContainer, MatSidenav, MatDivider, MatSidenavContent, 
              RouterOutlet,
              NgxUiLoaderModule]
})

export class AppComponent {
  title = 'gestorUsuarioFront';

  menus!: Menu[];
  estadoExt !: number;
  idExt !: number;
  usuarioExt !: string;
  ultimoLog !: string | undefined;
  fechaLog !:Date
  enllamada !: boolean;
  fechaActual : Date = new Date();
  parametrosDTO !: ParametrosDTO;

  constructor(
    public  loginService: LoginService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private askEstadoService: AskEstadoService,
    private usuarioService: UsuarioService,
    private usuariosMigraService : UsuariosMigraService,
    private bnIdle: BnNgIdleService,
    private snackBar: MatSnackBar
    ) {
      this.bnIdle.startWatching(14400).subscribe((res) => {
        if(res) {
          loginService.cerrarSesion();
        }
      })

     
  
    
  }

  ngOnInit() {

    this.loginService.getExtensionCambio().subscribe(data => {
      this.idExt = data;
    });

    this.loginService.getUsuariosCambio().subscribe(data => {
      this.usuarioExt = data;
    });

    this.loginService.getMenuCambio().subscribe(data => {
      this.menus = data;
    });
    this.askEstadoService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });    

    this.usuarioService.getUsuariosCambio().subscribe(data =>{
      this.ultimoLog = moment(data.ultimoLog).format('YYYY-MM-DD HH:mm:ss')
    })

    this.loginService.getUltimoCambio().subscribe(data =>{
    
      this.fechaLog = data;

    })
    
  }

  cerrarApp() {

 //   if (this.loginService.agenteDTO.idUsuario) {
      const askEstadoExtension =
      {
        estadoAsk: 1, idExtension: this.idExt, loginAgente: this.usuarioExt,
        nroDocumento: this.loginService.agenteDTO.nroDocumento, 
        //tipoDoc: moment(this.fechaActual).format('YYYY-MM-DD HH:mm:ss')
      }
      
      this.parametrosDTO = { nroDocumento: this.loginService.agenteDTO.nroDocumento , 
                             loginAgente: this.loginService.agenteDTO.usuario,
                             ultimoLogin: moment(this.fechaLog).format('YYYY-MM-DD HH:mm:ss') 
                            }


     this.askEstadoExtensionService.buscarAgente(this.parametrosDTO).subscribe(data => {

      if(data.askEstado?.idEstado===3){
        this.askEstadoService.setMensajecambio('EN LLAMADA')
      }
      else {
        this.askEstadoExtensionService.actualizarEstadoExt(askEstadoExtension).pipe(
          switchMap(() => this.usuariosMigraService.ultimoLogin(this.parametrosDTO))
        ).subscribe({
          next: () => {
            // Esto se ejecutará después de que ambas operaciones se completen con éxito
            this.loginService.cerrarSesion();
          },
          error: (error) => {
            // Manejar errores aquí
          }
        });

      }

     });

      

      // this.llamadaEntranteService.buscarLlamada(askEstadoExtension).subscribe(data => {
      //   this.enllamada = data;

      //   if (this.enllamada) {
      //     this.askEstadoService.setMensajecambio('EN LLAMADA')


      //   } else {
      //     this.askEstadoExtensionService.actualizarEstadoExt(askEstadoExtension).subscribe(() => { })

      //     this.loginService.cerrarSesion();

      //   }
      // })

  //  } 

  }
}
