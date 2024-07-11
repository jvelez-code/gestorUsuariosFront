import { ContentObserver } from '@angular/cdk/observers';
import { Component, INJECTOR, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EMPTY, Observable } from 'rxjs';
import { AskEstado } from 'src/app/_model/askEstado';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { AskEstadoService } from 'src/app/_services/ask-estado.service';
import { LlamadaEntranteService } from 'src/app/_services/llamada-entrante.service';
import { LoginService } from 'src/app/_services/login.service';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';



@Component({
    selector: 'app-extado-ext',
    templateUrl: './estado-ext.component.html',
    styleUrls: ['./estado-ext.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatFormField, MatLabel, MatSelect, MatOption, MatCardActions, MatButton, AsyncPipe]
})
export class ExtadoExtComponent implements OnInit {

  estadoExt !:number;
  idExt !:number | undefined;
  usuarioExt !:string;
  enAsterisk!: boolean;
  enllamada!: boolean;
  documentoExt !:any;
  private fechaActual = moment();
  
  askEstados$ !: Observable<AskEstado[]>;

  constructor (
    private askEstadoService: AskEstadoService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private loginService: LoginService,
    private llamadaEntranteService: LlamadaEntranteService,
    private snackBar: MatSnackBar
  )
  {
    
  }



  ngOnInit(): void {
    
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

    const askEstadoExtension ={ estadoAsk : this.estadoExt, idExtension : this.idExt, 
      loginAgente: this.usuarioExt, 
      nroDocumento: this.loginService.agenteASK.nroDocumento, tipoDoc:this.fechaActual.format('YYYY-MM-DD 01:01:01') }
      
    // this.llamadaEntranteService.buscarLlamada(askEstadoExtension).subscribe(data =>{
    // this.enllamada=data;
  
    // if(this.enllamada) {

    this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe(data => {
      this.idExt = data.askEstado?.idEstado;
      
    
      if(this.idExt===3) {

      this.askEstadoService.setMensajecambio('EN LLAMADA')         
    }
    else{
      
          if(this.estadoExt===2){

          this.llamadaEntranteService.buscarLogin(askEstadoExtension).subscribe(data =>{
            this.enAsterisk=data;

          if(this.enAsterisk){
            this.askEstadoExtensionService.actualizarEstadoExt(askEstadoExtension).subscribe(()=>{});
            this.askEstadoService.setMensajecambio('SE ACTUALIZÓ')       
  
            }else {
            this.askEstadoService.setMensajecambio('LOGUEO EN ASTERISK')       
            }
          }); 
         }
    
    
      
        else if ( this.estadoExt == 4 || this.estadoExt == 5 || this.estadoExt == 6 || this.estadoExt == 7 || 
          this.estadoExt == 8 || this.estadoExt == 9 || this.estadoExt == 10 || this.estadoExt == 13 || this.estadoExt == 14 ) {
         
        this.askEstadoExtensionService.actualizarEstadoExt(askEstadoExtension).subscribe(()=>{});     
        this.loginService.cerrarSesion(); 
        
              }
        else if ( this.estadoExt == 11 || this.estadoExt == 15 || this.estadoExt == 16 ||
           this.estadoExt == 17 || this.estadoExt == 18 ){

          this.askEstadoExtensionService.actualizarEstadoExt(askEstadoExtension).subscribe(()=>{});     
          this.askEstadoService.setMensajecambio('SE ACTUALIZÓ')         
        }
      
    
    
       }
      })
  // })
   }


  
}
