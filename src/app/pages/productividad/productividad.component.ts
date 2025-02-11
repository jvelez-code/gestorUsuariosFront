import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';
import * as moment from 'moment';
import { CantidadGestionDTO } from 'src/app/_dto/CantidadGestionDTO ';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { ClienteService } from 'src/app/_services/cliente.service';
import { ContactoService } from 'src/app/_services/contacto.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { LlamadaEntranteService } from 'src/app/_services/llamada-entrante.service';
import { LoginService } from 'src/app/_services/login.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-productividad',
    templateUrl: './productividad.component.html',
    styleUrls: ['./productividad.component.scss'],
    imports: [RouterOutlet, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, NgClass, MatFormField, MatLabel, MatInput, ReactiveFormsModule, FormsModule]
})
export class ProductividadComponent implements OnInit, OnDestroy {

  usuarios !: string;
  parametrosDTO !:ParametrosDTO
  empresa?: string;
	tmousuario?: string;
  mostrarColor: boolean = false;
  promedio?: string;
  promedioCON: string = "00:07:30";
  promedioASI: string = "00:10:30";
  promedioELC: string = "00:12:30";
  agenteDTO!: AgenteDTO;

  constructor( 
    private loginService: LoginService,
    private tipoDocumentoService : TipoDocumentoService,
    private clienteService : ClienteService,
    private detalleGestionService : DetalleGestionService,
    private gestionService :GestionService,
    private estadoGestionService :EstadoGestionService,
    private contactoService :ContactoService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private usuarioService : UsuarioService,
    private llamadaEntranteService : LlamadaEntranteService,
    private router: Router,
    private snackBar: MatSnackBar) {   }

  ngOnInit(): void {

    this.agenteDTO=this.loginService.agenteDTO

    if(this.agenteDTO){
    this.loginService.getUsuariosCambio().subscribe((data:any) =>{
      this.usuarios=data;
     });

    const askEstadoExtension ={  loginAgente : this.usuarios }
    this.parametrosDTO = { loginAgente:this.usuarios ,nroDocumento: this.agenteDTO.nroDocumento  }
    

    this.detalleGestionService.cantidadGestion(askEstadoExtension).subscribe(data =>{
      this.dataSourceCant= new MatTableDataSource(data);
    });

    this.gestionService.getGestionCambio().subscribe(data =>{
      this.dataSourceCant= new MatTableDataSource(data);
    });

    this.llamadaEntranteService.usuarioTmo(this.parametrosDTO).subscribe(data=>{
        this.tmousuario = data.tmoAgente
        let datePromedioC: moment.Moment = moment(this.promedioCON, "HH:mm:ss");
        let datePromedioE: moment.Moment = moment(this.promedioELC, "HH:mm:ss");
        let datePromedioA: moment.Moment = moment(this.promedioASI, "HH:mm:ss");          
        let dateTmo: moment.Moment = moment(this.tmousuario, "HH:mm:ss"); 
        this.empresa = this.agenteDTO.pseudonimo

        if(this.empresa=='CONTACT' ){this.promedio=this.promedioCON;}
        if(this.empresa=='ELECTRONICA' ){this.promedio=this.promedioELC;}
        if(this.empresa=='ASISTIDA' ){this.promedio=this.promedioASI;}

        if (this.empresa=='CONTACT' && dateTmo>datePromedioC ){ this.mostrarColor= true; }        
        if(this.empresa=='ELECTRONICA' && dateTmo>datePromedioE){ this.mostrarColor= true; }          
        if(this.empresa=='ASISTIDA' && dateTmo>datePromedioA){ this.mostrarColor= true; }          
        else {  console.log('empresa diferente')  }

      });
    }


  }


  cantidadColumns: string[] = ['usuario', 'efectiva', 'cantidad'];
  dataSourceCant !: MatTableDataSource<CantidadGestionDTO>; 

  


  ngOnDestroy(): void {
    
   }

}
