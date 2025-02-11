import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { DivipolaDTO } from 'src/app/_dto/divipolaDTO ';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { Archivo } from 'src/app/_model/archivo';
import { Campana } from 'src/app/_model/campana';
import { ArchivoService } from 'src/app/_services/archivo.service';
import { CampanaService } from 'src/app/_services/campana.service';
import { ClienteService } from 'src/app/_services/cliente.service';
import { DivipolaService } from 'src/app/_services/divipola.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
    selector: 'app-cargue-campana',
    imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './cargue-campana.component.html',
    styleUrl: './cargue-campana.component.scss'
})
export class CargueCampanaComponent implements OnInit {

  selectedFile: File | null = null;
  fileName!: string ;
  lineCount: number | null = null;

  campana!: Campana ;
  idCampana !: number  ;
  agenteDTO!: AgenteDTO;
  parametroDTO!: ParametrosDTO;
  idUsuario ?: number ;
  pseudonimo?: string ;
  idEmpresa ?: number ;
  idZona ?: number ;


  suma : number = 0 ;
  cantRegistros ?:number;
  cantClientes ?:number;
  idCampanaS?: number ;
  hostIp?: string ;
  usuario?: string ;




  constructor( 
    private gestionService: GestionService,
    private loginService: LoginService,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
  )
  {
  }


  ngOnInit(): void {
    this.initAgenteDTO();

    this.clienteService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  initAgenteDTO(): void {
    const agenteDTO = this.loginService.agenteDTO;
    this.idUsuario = agenteDTO.idUsuario;
    this.usuario = agenteDTO.usuario;
    this.pseudonimo = agenteDTO.pseudonimo;
    this.idEmpresa = agenteDTO.idEmpresa;
    this.hostIp = agenteDTO.hostIp;
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
    } 
  }

  cargueArchivo() {

    if (!this.selectedFile) {
      return EMPTY; 
    }

    this.fileName= this.selectedFile.name;
    this.parametroDTO = { idUsuario: this.idUsuario, idEmpresa: this.idEmpresa}
    this.gestionService.cargueArchivo(this.selectedFile, this.parametroDTO).subscribe(data =>{
      this.idCampana = data.campanaSal ?? 0;
      this.cantRegistros = data.gestionNuevo
      this.cantClientes = data.clienteNuevo;
    });
    this.clienteService.setMensajecambio('SE CARGO CAMPAÑA')
    return EMPTY;
  }
  


  limpiarVariables(): void {
    this.selectedFile = null;
    this.fileName = '';
    this.idCampana = 0;
    this.cantRegistros = 0;
    this.cantClientes = 0
  }


}
