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
  standalone: true,
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

  // readFile(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = (e: ProgressEvent<FileReader>) => {
  //     const fileContent = (e.target as FileReader).result as string;
  //     this.lineCount = (this.countLines(fileContent))/2;
  //   };
  //   reader.readAsText(file);
  // }

  // countLines(text: string): number {
  //   return text.split('\n').length;
  // }

  // subirArchivo() {
  //   if (this.selectedFile) {
  //     this.crearCampana().pipe(
  //       switchMap(campanaId => {
  //         this.idCampana = campanaId;
  //         return this.crearArchivo();
  //       }),
  //       switchMap(() => this.cargueArchivo())
  //     ).subscribe(
  //       () => {
  //         this.limpiarVariables();
  //         this.selectedFile = null;
  //       }
  //     );

  //   } else{       
  //     this.clienteService.setMensajecambio('SIN ARCHIVO');
  //       }
  // }

  // crearCampana(): Observable<number> {
  //   let tipoCa = new TipoCampana();
  //   tipoCa.idTipoCampana = 4; // Especial aportante

  //   let estadoCa = new EstadoCampana();
  //   estadoCa.idEstadoCampana = 1; // CARGADA

  //   let empre = new Empresa();
  //   empre.idEmpresa = this.idEmpresa ?? 0;

  //   let campa = new Campana();
  //   campa.tipoCampana = tipoCa;
  //   campa.estadoCampana = estadoCa;
  //   campa.tiempoCargueCampana = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  //   campa.fechaHoraCargue = moment().format('YYYY-MM-DD HH:mm:ss');
  //   campa.idCoordinador = this.idUsuario;
  //   campa.tipoAsignacion = 2;
  //   campa.grupoRol = this.pseudonimo;
  //   campa.empresa = empre;
  //   campa.nombre = this.fileName.replace(/\.csv$/, '');

  //   return this.campanaService.registrar(campa).pipe(
  //     map((data: any) => data.idCampana)
  //   );
  // }

  // crearArchivo() {
  //   let campas = new Campana();
  //   campas.idCampana = this.idCampana;

  //   let archivo = new Archivo();
  //   archivo.usuarioCargue = '';
  //   archivo.nombreArchivo = this.fileName;
  //   archivo.cantidadRegistros = this.lineCount ?? 0;
  //   archivo.fechaHoraCargue = moment().format('YYYY-MM-DD HH:mm:ss');
  //   archivo.registrosExitosos = this.lineCount ?? 0;
  //   archivo.registrosError = 0;
  //   archivo.operacion = '';
  //   archivo.campana = campas;

  //   return this.archivoService.registrar(archivo);
  // }


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
  

  // async procesarItem(item: any) {

  //   this.suma += 1;

  //   // if (item.idCliente === 0) {
  //   //   try {
  //   //     await this.procesarNuevoCliente(item);
  //   //   } catch (error) {
  //   //     console.error('Error registrando carga:', error);
  //   //     return; 
  //   //   }
  //   // }

  //   const gestion = this.crearGestion(item);

  //   try {
  //     const gestionData = await this.gestionService.registrarCargue(gestion).toPromise();
  //   } catch (error) {
  //     console.error('Error registrando carga:', error);
  //   }
  // }

  // private async procesarNuevoCliente(item: any): Promise<void> {
  //   const divipolaDto: DivipolaDTO = { nombre: item.codMunicipio };

  //   try {
  //     const divipolaData = await this.divipolaService.buscarCargue(divipolaDto).toPromise();
  //     if(divipolaData){
  //       this.idZona = divipolaData[0].idZona;
  //     }
      
  //     const tipo = new TipoDocumento();
  //     tipo.tipoDoc = item.tipoDocumento;

  //     const divi = new Divipola();
  //     divi.idZona = this.idZona;

  //     const cli = new Cliente();
  //     cli.tipoDocumento = tipo;
  //     cli.nroDocumento = item.nroDocumento;
  //     cli.divipola = divi;
  //     cli.razonSocial = item.razonSocial;
  //     cli.direccion = '';
  //     cli.telefonoFijo = item.telefonoMovi;
  //     cli.telefonoCelular = item.telefonoResi;
  //     cli.correo = item.correo;
  //     cli.cantidadEmpleados = '1';
  //     cli.usuario = this.usuario;
  //     cli.ley1581 = true;
  //     cli.fechaHoraSistema = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  //     cli.ip = this.hostIp;

  //     const clienteData = await this.clienteService.guardarCliente(cli).toPromise();
  //     if(clienteData){
  //       item.idCliente = clienteData.idCliente;
  //     }
      
  //   } catch (error) {
  //     throw new Error('Error procesando nuevo cliente: ' );
  //   }
  // }

  // private crearGestion(item: any): Gestion {
  //   const tipo = new TipoDocumento();
  //   tipo.tipoDoc = item.tipoDocumento;

  //   const usuario = new Usuario();
  //   usuario.idUsuario = this.idUsuario ?? 0;

  //   const cliente = new Cliente();
  //   cliente.idCliente = item.idCliente;

  //   const divi = new Divipola();
  //   divi.idZona = 184;

  //   const estadoGestion = new EstadoGestion();
  //   estadoGestion.idEstadoGestion = 7;

  //   const contacto: Contacto[] = [];
  //   const cont = new Contacto();
  //   cont.nombre = item.razonSocial;
  //   cont.correoElectronico = item.correo;
  //   cont.numeroContacto = item.telefonoMovi;
  //   cont.telefonoDirecto = item.telefonoResi;
  //   cont.telefonoCelular = item.telefonoTrab;
  //   cont.cliente = cliente;
  //   cont.usuario = usuario;
  //   cont.divipola = divi;
  //   cont.nroEmpleado = 1;
  //   contacto.push(cont);

  //   const gestion = new Gestion();
  //   gestion.cliente = cliente;
  //   gestion.agente = usuario;
  //   gestion.listaContacto = contacto;
  //   gestion.estadoGestion = estadoGestion;
  //   gestion.campana = new Campana();
  //   gestion.campana.idCampana = this.idCampana;
  //   gestion.usuarioAct = this.usuario;
  //   gestion.ipAct = this.hostIp;
  //   gestion.flagGestionSucursal = false;
  //   gestion.callid = 'N/A';
  //   gestion.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  //   gestion.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

  //   return gestion;
  // }

  limpiarVariables(): void {
    this.selectedFile = null;
    this.fileName = '';
    this.idCampana = 0;
    this.cantRegistros = 0;
    this.cantClientes = 0
  }


}
