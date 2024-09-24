import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { Contacto } from 'src/app/_model/contactos';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { EstadoGestion } from 'src/app/_model/estadoGestion';
import { Gestion } from 'src/app/_model/gestion';
import { Parametros } from 'src/app/_model/parametros';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { ClienteService } from 'src/app/_services/cliente.service';
import { ContactoService } from 'src/app/_services/contacto.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { FiltroDetalleGestionDTO } from 'src/app/_dto/filtroDetalleGestionDTO';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/_services/login.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import * as moment from 'moment';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { Usuario } from 'src/app/_model/usuario';
import { Campana } from 'src/app/_model/campana';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { Extension } from 'src/app/_model/extension';
import { MatAccordion } from '@angular/material/expansion';
import { MensajeTextoService } from 'src/app/_services/mensaje-texto.service';
import { MatDialog } from '@angular/material/dialog';
import { PilaenlaceService } from 'src/app/_services/pilaenlace.service';
import { Planillas } from 'src/app/_model/planillas';
import { Divipola } from 'src/app/_model/divipola';
import { ValidadoresService } from 'src/app/_services/validadores.service';

import { MatCardModule } from '@angular/material/card';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO'; import { RespuestaPila } from 'src/app/_dto/RespuestaPila';
import { Planilla } from 'src/app/_dto/Planilla';
;


@Component({
  selector: 'app-entrantes',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDividerModule,
    MatExpansionModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatToolbarModule,
    CommonModule
  ],
  templateUrl: './entrantes-emb.component.html',
  styleUrl: './entrantes-emb.component.scss'
})
export class EntrantesEmbComponent implements OnInit, OnDestroy {

  clienteColumns = ['razonSocial', 'tipoDocumento.tipoDoc', 'nroDocumento', 'divipola.nombre',
    'divipola.idZonapadre.nombre', 'correo', 'telefonoCelular', 'telefonoFijo', 'acciones'];
  dataSourceCli !: MatTableDataSource<Cliente>;

  detalleGestionColumns: string[] = ['fecha', 'usuario', 'campana', 'tipo', 'subtipo', 'observacion', 'numero'];
  dataSourceHisto !: MatTableDataSource<FiltroDetalleGestionDTO>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cantidad: number = 0;


  /*PLANILLAS PILA */
  planillaColumns: string[] = ['tipoPlanilla', 'numeroPlanilla', 'numeroPin', 'valorPago', 'fechaPago', 'periodoMes', 'periodoAnio'];
  dataSourcePla !: MatTableDataSource<Planillas>;

  displayedColumns: string[] = ['numeroPlanilla', 'tipoPlanilla', 'numeroPin'];
  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatPaginator, { static: true }) paginatorpla!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortpla!: MatSort;



  generarColumns: string[] = ['value', 'tipoPlanilla', 'numeroPin', 'numeroPlanilla', 'valorPago'];
  dataSourceGen !: MatTableDataSource<RespuestaPila>;
  datos: RespuestaPila | undefined;


  soporteColumns: string[] = ['message'];
  dataSourceSop !: MatTableDataSource<RespuestaPila>;

  @ViewChild(MatAccordion) accordion !: MatAccordion;


  private subscripcion: Subscription = new Subscription();

  parametrosDTO!: ParametrosDTO;
  tipoDocumento !: string;
  tipoLlamada !: number;
  idContactoP   !: number;
  gestionPadre !: number;
  gestionHijo !: number;
  panelOpenState = false;
  tipoGestionP !: number;
  tipoGestionH !: number;
  idEstadoH   !: number;

  nombreC !: string;
  correoC !: string;
  telPrincipalC !: string;
  telSecundarioC !: string;
  telCelularC !: string;
  callid !: string;
  cardCliente: boolean = false;
  filaPar: boolean = true;


  parametros !: Parametros;
  gestion !: Gestion;
  cliente !: Cliente;
  estadoGestion !: EstadoGestion;

  detalleGestion: DetalleGestion[] = [];
  contacto: Contacto[] = [];
  agenteDTO!: AgenteDTO;



  idCliente?: number;
  idEstadoP?: number;

  idUsuario   !: number;
  usuario?: string;
  nroDocumento?: string;
  primerNombre?: string;
  primerApellido?: string;
  idEmpresa?: number;
  pseudonimo?: string;
  descripcion?: string;
  idCampanaE?: number;
  nombreCamE?: string;
  tipoLlamadaCamE?: string;
  hostIp?: string;;
  extension: any;
  numRealMarcado?: string;
  idZona?: number;





  form!: FormGroup;
  formContacto!: FormGroup;
  formGuardar!: FormGroup;
  formHist!: FormGroup;
  id!: number;
  edicion!: boolean;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  tipoGestion$ !: Observable<EstadoGestion[]>;
  tiposGestion !: EstadoGestion[];
  subTipoGestion$ !: Observable<EstadoGestion[]>;
  gestion$ !: Observable<EstadoGestion[]>;
  agenteCampanas!: any;
  numeroReal !: string;
  //generarPlanilla$ !: Observable<RespuestaPila[]>


  MessageText: string = 'le confirma: PIN   , VALOR $ , FECHA DE PAGO PERIODO  .';
  Type: string = 'MASSIVE';
  FlashSMS: number = 0;
  Devices !: string;
  planillames: string = '01';
  planillaanio: string = '2024';
  modalidad: number = 1;
  tipoDoc !: any;
  numDocu !: any;
  planilla !: string;
  reporte: number = 1;
  years: number[] = [];



  constructor(
    private clienteService: ClienteService,
    private detalleGestionService: DetalleGestionService,
    private gestionService: GestionService,
    private estadoGestionService: EstadoGestionService,
    private contactoService: ContactoService,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private pilaenlaceService: PilaenlaceService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private mensajeTextoService: MensajeTextoService,
    private validadoresService: ValidadoresService) {
    this.crearFormulario()
  }





  ngOnInit(): void {



    this.dataSource.paginator = this.paginatorpla;
    this.dataSource.sort = this.sortpla;

    this.loginService.getUsuariosCambio().subscribe((data: any) => {
      this.usuario = data;
    });


    this.agenteDTO = this.loginService.agenteDTO;

    this.idCampanaE = this.agenteDTO.idCampanaE;
    this.idUsuario = this.agenteDTO.idUsuario ?? 0;
    this.idEmpresa = this.agenteDTO.idEmpresa;
    this.hostIp = this.agenteDTO.hostIp;

    // this.parametrosDTO = { loginAgente: this.usuario }
    // this.usuarioService.buscarAgenteCampana(this.parametrosDTO).subscribe(data => {
    //   console.log(data,'buscarAgenteCampana')
    //   this.idCampanaE = data.idCampanaE;
    //   this.idUsuario = data.idUsuario;
    //   this.idEmpresa = data.idEmpresa;
    //   this.hostIp = data.hostIp;

    // });

    this.clienteSelec();
    this.gestionHistorico();
    this.contactoUltimo();






    const askEstadoExtension = { loginAgente: this.usuario }

    this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe(data => {
      this.extension = data.idExtension;
      this.numRealMarcado = data.numeroOrigen;
    });


    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    })

    this.clienteService.getcallid().subscribe(data => {
      this.callid = data;
    });

    const yearActual = new Date().getFullYear();
    for (let i = 0; i <= 14; i++) {
      this.years.push(yearActual - i);
    }

  }

  crearFormulario() {

    this.clienteService.getnumeroReal().subscribe(data => {
      console.log(data,'numeroreal')
      this.numeroReal = data;
    })

    this.formGuardar = this.fb.group({
      'observacionD': ['', [Validators.required, Validators.minLength(4)]],
      'numeroreal': [this.numeroReal, [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      'tipificacioP': ['', [Validators.required, this.validadoresService.validatetipo]],
      'tipificacioH': ['', [Validators.required, this.validadoresService.validatetipo]]
    });

    this.formContacto = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'telPrincipal': new FormControl(''),
      'telSecundario': new FormControl(''),
      'telCelular': new FormControl(''),
    });


  }


  clienteSelec() {

    this.clienteService.getIdClienteCambio().subscribe(data => {
      this.idCliente = data

      const cliente = { idCliente: this.idCliente }
      this.clienteService.clientePorId(cliente).subscribe(data => {
        this.clienteService.setClienteCambio(data)
        this.dataSourceCli = new MatTableDataSource(data);
        this.idZona = data[0].divipola?.idZona;
        this.tipoDoc = data[0].tipoDocumento?.tipoDoc;
        this.numDocu = data[0].nroDocumento;

      });

    });
  }


  abrirDialogo(cliente?: Cliente) {
    // this.dialog.open(ClienteDialogoComponent, {
    //   width: '350px',
    //   data: cliente
    // });
  }





  gestionHistorico() {

    this.tipoLlamada = 0;
    const parametros = {
      nroDoc: this.nroDocumento, idEmpresa: this.idEmpresa,
      tipoLlamada: this.tipoLlamada, idEstadoPadre: this.tipoGestionP,
      idCliente: this.idCliente
    }

    this.parametrosDTO = {
      nroDocumento: this.nroDocumento, idEmpresa: this.idEmpresa,
      tipoLlamada: this.tipoLlamada, idEstadoPadre: this.tipoGestionP,
      idCliente: this.idCliente
    }

    //HISTORICO
    this.detalleGestionService.detalleHistorico(this.parametrosDTO).subscribe(data => {
      this.dataSourceHisto = new MatTableDataSource(data);
      this.dataSourceHisto.sort = this.sort;
      this.dataSourceHisto.paginator = this.paginator;
    });

    //TIPIFICACIÓN
    this.tipoGestion$ = this.estadoGestionService.estadoGestionPadre(parametros);

    this.estadoGestionService.estadoGestionPadre(parametros).subscribe(data => {

      this.tiposGestion = data;
    }
    );
  }

  tipoGestion(tipoGestionP: number) {
    this.idEstadoP = tipoGestionP;
    this.tipoGestionH = 0;
    this.idEstadoH = this.tipoGestionH;
    const parametros = { idEstadoPadre: this.tipoGestionP, tipoLlamada: this.tipoLlamada, }

    this.subTipoGestion$ = this.estadoGestionService.estadoGestionHijo(parametros);

    this.estadoGestionService.estadoGestionHijo(parametros).subscribe(data => {

      this.tipoGestionH = (Array.isArray(data) && data.length > 0) ? this.tipoGestionH : this.tipoGestionP;
      this.idEstadoH = (Array.isArray(data) && data.length > 0) ? this.idEstadoH : this.tipoGestionP;

    });

    if (this.idEstadoH == 0) {
      this.idEstadoH = this.tipoGestionP;
    }
  }


  subtipoGestion(tipoGestionH: number) {
    this.idEstadoH = tipoGestionH;
  }


  //LISTA DE CONTACTO

  contactoUltimo() {
    // console.log(this.formContacto.status,'hola')

    // if(this.formContacto.valid){
    //   console.log('munbdo')
    //   return Object.values(this.formContacto.controls).forEach( control =>{
    //     control.markAllAsTouched();
    //   });
    // }

    const parametros = { idCliente: this.idCliente }

    this.contactoService.filtroContacto(parametros).subscribe(data => {
      if (data == null) {
        this.formContacto = this.fb.group({
          'nombre': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
          'correo': ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
          'telPrincipal': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          'telSecundario': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          'telCelular': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        });
      } else {
        this.formContacto = this.fb.group({
          'nombre': [data.nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
          'correo': [data.correoElectronico, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
          'telPrincipal': [data.numeroContacto, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          'telSecundario': [data.telefonoDirecto, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          'telCelular': [data.telefonoCelular, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        });

      }
    });
  }




  get nombreNoValido() {
    return this.formContacto.get('nombre')?.invalid && this.formContacto.get('nombre')?.touched
  }
  get correoNoValido() {
    return this.formContacto.get('correo')?.invalid && this.formContacto.get('correo')?.touched
  }
  get telPrincipalNoValido() {
    return this.formContacto.get('telPrincipal')?.invalid && this.formContacto.get('telPrincipal')?.touched
  }
  get telSecundarioNoValido() {
    return this.formContacto.get('telSecundario')?.invalid && this.formContacto.get('telSecundario')?.touched
  }
  get telCelularNoValido() {
    return this.formContacto.get('telCelular')?.invalid && this.formContacto.get('telCelular')?.touched
  }
  get observacionNoValido() {
    return this.formGuardar.get('observacionD')?.invalid && this.formGuardar.get('observacionD')?.touched
  }
  get numerorealNoValido() {
    return this.formGuardar.get('numeroreal')?.invalid && this.formGuardar.get('numeroreal')?.touched
  }

  validarNumeros(event: KeyboardEvent) {
    const input = event.key;
    const regex = /[0-9]/;
    if (!regex.test(input)) {
      event.preventDefault();
    }

  }




  guardarGestion() {
    if (this.formContacto.invalid) {
      return Object.values(this.formContacto.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }

    let campana = new Campana();
    campana.idCampana = this.idCampanaE

    let ext = new Extension();
    ext.extension = this.extension;


    let usuario = new Usuario();
    usuario.idUsuario = this.idUsuario;


    let cliente = new Cliente();
    cliente.idCliente = this.idCliente;

    let divi = new Divipola();
    divi.idZona = this.idZona;

    let estadoGestion = new EstadoGestion();
    estadoGestion.idEstadoGestion = this.idEstadoP;

    let estadoGestionH = new EstadoGestion();
    estadoGestionH.idEstadoGestion = this.idEstadoH;


    let det = new DetalleGestion();
    det.observacion = this.formGuardar.value['observacionD'];
    det.numRealMarcado = this.formGuardar.value['numeroreal'];
    det.usuario = usuario;
    det.estadoGestion = estadoGestionH;
    det.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.ip = this.hostIp;
    det.usuarioAct = this.usuario;
    det.extension = ext;
    this.detalleGestion.push(det);

    let cont = new Contacto();
    cont.nombre = this.formContacto.value['nombre'];
    cont.correoElectronico = this.formContacto.value['correo'];
    cont.numeroContacto = this.formContacto.value['telPrincipal'];
    cont.telefonoDirecto = this.formContacto.value['telSecundario'];
    cont.telefonoCelular = this.formContacto.value['telCelular'];
    cont.cliente = cliente;
    cont.usuario = usuario;
    cont.divipola = divi;
    this.contacto.push(cont);


    let gestion = new Gestion();
    gestion.cliente = cliente;
    gestion.agente = usuario;
    gestion.listaDetalleGestion = this.detalleGestion;
    gestion.listaContacto = this.contacto;
    gestion.estadoGestion = estadoGestion;
    gestion.campana = campana;
    gestion.usuarioAct = this.usuario;
    gestion.ipAct = this.hostIp
    gestion.flagGestionSucursal = false
    gestion.callid = this.callid
    gestion.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    gestion.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

    this.gestionService.guardarGestionS(gestion).subscribe(() => {
      this.clienteService.setMensajecambio('SE REGISTRÓ');
      this.clienteService.setFormCambio(this.cardCliente)
    });

    const askEstadoExtension = { loginAgente: this.usuario }
    this.detalleGestionService.cantidadGestion(askEstadoExtension).subscribe(data => {
      this.gestionService.setGestionCambio(data);
    });

    this.router.navigate(['filtroEntrante']);


  }

  mensajeTexto() {

    const parametros = {
      MessageText: this.MessageText, Type: this.Type,
      FlashSMS: this.FlashSMS, Devices: this.formContacto.value['telCelular']
    }

    this.mensajeTextoService.gestionHistoricoS(parametros).subscribe(data => {
      this.clienteService.setMensajecambio('ENVIADO SMS');
    }
    )
  }

  cancelarGestion() {
    this.clienteService.setFormCambio(this.cardCliente)
    this.clienteService.setMensajecambio('SE CANCELO');
    this.router.navigate(['filtroEntrante']);
    setTimeout(() => {
      this.limpiarControles();
    }, 2000);

  }


  limpiarControles() {
    this.detalleGestion = [];
    this.contacto = [];
    this.idCliente = 0;
    this.idEstadoP = 0;
  }




  //3//
  buscarPlanilla() {

    console.log('3');

    const planillas: Element[] = [];

    this.pilaenlaceService.buscarPlanillas().subscribe(data => {
      console.log(data, '3');

      const planillas: Element[] = [];

      data.object.ASISTIDAS.forEach((item: Planilla) => {
        planillas.push({ numeroPlanilla: item.numeroPlanilla, entidadRecaudo: 'Asistida', tipoPlanilla: item.tipoPlanilla, numeroPin: item.numeroPin });
      });

      data.object.ELECTRONICAS.forEach((item: Planilla) => {
        planillas.push({ numeroPlanilla: item.numeroPlanilla, entidadRecaudo: 'Electrónica', tipoPlanilla: item.tipoPlanilla, numeroPin: item.numeroPin });
      });

      console.log(planillas, 'final');
      this.dataSource.data = planillas;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });






    // this.pilaenlaceService.buscarPlanilla(this.tipoDoc, this.numDocu, this.planillaanio , this.planillames)
    // .subscribe( (data:any) =>{
    //  if (data.codigoMensaje==='01'){
    //   this.clienteService.setMensajecambio('NO ACTIVAS PARA PAGO');

    //  } else {
    //  const respuestastring = JSON.stringify(data);
    //  const respuestaArray: Planillas[] = JSON.parse(respuestastring);
    //  this.dataSourcePla= new MatTableDataSource(data.planillas);
    // }
    //});    

  }




  //6//
  generarPlanilla() {

    const apiPilaDto = {
      tipoIde: this.tipoDoc, numeroIde: this.numDocu,
      periodoGeneracion: `${this.planillaanio}-${this.planillames}`, modalidad: this.modalidad, usuario: `GC_${this.usuario}`
    }

    this.pilaenlaceService.generarPlanillaS(apiPilaDto).subscribe(data => {
      if (data.object) {
        this.dataSourceGen = new MatTableDataSource([data]);

      }
      this.clienteService.setMensajecambio(data.value);


    });

    /*this.PilaenlaceService.envioSoporteS(apiPilaDto).subscribe(data =>{
      console.log(data,'soporte')
    });

    this.PilaenlaceService.validarPlanillaS(apiPilaDto).subscribe(data =>{
      console.log(data,'validacion')
    });*/
  }


  //5//
  generarSoporte() {

    const apiPilaDto = { reporte: this.reporte, planilla: this.planilla }

    this.pilaenlaceService.envioSoporte(apiPilaDto).subscribe(data => {
      this.dataSourceSop = new MatTableDataSource([data]);
    });


  }



  ngOnDestroy() {
    // Desuscripción para evitar fugas de memoria
    this.subscripcion.unsubscribe();
  }

}


export interface Element {
  entidadRecaudo: string;
  numeroPlanilla: string;
  tipoPlanilla: string;
  numeroPin: string;
}
