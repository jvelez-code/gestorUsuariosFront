import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CantidadGestionDTO } from 'src/app/_dto/CantidadGestionDTO ';
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

@Component({
  selector: 'app-productividad',
  templateUrl: './productividad.component.html',
  styleUrls: ['./productividad.component.css']
})
export class ProductividadComponent implements OnInit, OnDestroy {

  private usuarios !: string;


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

    this.loginService.getUsuariosCambio().subscribe((data:any) =>{
      this.usuarios=data;
     });

    const askEstadoExtension ={  loginAgente : this.usuarios }
    console.log(askEstadoExtension,'cantidad-1')
    this.detalleGestionService.cantidadGestion(askEstadoExtension).subscribe(data =>{
      console.log(data,'cantidad')
      this.dataSourceCant= new MatTableDataSource(data);
    });

    this.gestionService.getGestionCambio().subscribe(data =>{
      this.dataSourceCant= new MatTableDataSource(data);
    });

  }

  cantidadColumns: string[] = ['usuario', 'efectiva', 'cantidad'];
  dataSourceCant !: MatTableDataSource<CantidadGestionDTO>; 


  ngOnDestroy(): void {
    
   }

}
