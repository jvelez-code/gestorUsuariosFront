import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import { ThisReceiver } from '@angular/compiler';
import { FiltroDetalleGestionDTO } from 'src/app/_dto/filtroDetalleGestionDTO';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/_services/login.service';
import { AgenteCampana } from 'src/app/_model/agenteCampana';
import { AgenteCampanaService } from 'src/app/_services/agente-campana.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import * as moment from 'moment';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { Usuario } from 'src/app/_model/usuario';
import { Campana } from 'src/app/_model/campanas';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { Extension } from 'src/app/_model/extension';
import { MatAccordion } from '@angular/material/expansion';
import { MensajeTextoService } from 'src/app/_services/mensaje-texto.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDialogoComponent } from './cliente-dialogo/cliente-dialogo.component';
import { PilaenlaceService } from 'src/app/_services/pilaenlace.service';
import { Planillas } from 'src/app/_model/planillas';
import { Divipola } from 'src/app/_model/divipola';
import { ValidadoresService } from 'src/app/_services/validadores.service';

@Component({
  selector: 'app-entrantes',
  templateUrl: './entrantes.component.html',
  styleUrls: ['./entrantes.component.css']
})
export class EntrantesComponent implements OnInit, OnDestroy{

  clienteColumns = ['razonSocial','tipoDocumento.tipoDoc','nroDocumento','divipola.nombre',
  'divipola.idZonapadre.nombre','correo','telefonoCelular','telefonoFijo','acciones'];
  dataSourceCli !: MatTableDataSource<Cliente>; 

  detalleGestionColumns: string[] = ['fecha','usuario','campana','tipo','subtipo','observacion','numero'];
  dataSourceHisto !: MatTableDataSource<FiltroDetalleGestionDTO>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cantidad: number = 0;


  @ViewChild(MatAccordion) accordion !: MatAccordion;


  private subscripcion : Subscription = new Subscription();
  tipoDocumento !: string;
  tipoLlamada !: number;
  idContactoP   !: number;
  gestionPadre !: number;
  gestionHijo !: number;
  panelOpenState = false;
  tipoGestionP !: number ;
  tipoGestionH !: any;

  nombreC !:String;
  correoC !:String;
  telPrincipalC !:String;
  telSecundarioC !:String;
  telCelularC !:String;
  callid !: string;
  cardCliente : boolean= false ;

 
  parametros !: Parametros;
  gestion !: Gestion;
  cliente !: Cliente;
  estadoGestion !: EstadoGestion;

  detalleGestion: DetalleGestion [] = [];
  contacto : Contacto [] = [];
  agenteDtos !: AgenteDTO;
  AgenteDTO!: AgenteDTO;


  idClienteP   !: any;
  idEstadoP   !: any;
  idEstadoH   !: any;
  idUsuario   !: any;
  usuario   !: any;
  nroDocumento   !: any;
  primerNombre   !: any;
  primerApellido   !: any;
  idEmpresa   !: any;
  pseudonimo   !: any;
  descripcion   !: any;
  idCampanaE   !: any;
  nombreCamE   !: any;
  tipoLlamadaCamE   !: any;
  hostIp   !: any;
  extension !: any;
  numRealMarcado !: any;
  idZona !: any;
  
  
  

  
  form!: FormGroup;
  formGuardar!: FormGroup;
  formContacto!: FormGroup;
  formHist!: FormGroup;
  id!: number;
  edicion!: boolean;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  tipoGestion$ !: Observable<EstadoGestion[]>;
  subTipoGestion$ !: Observable<EstadoGestion[]>;
  gestion$ !: Observable<EstadoGestion[]>;
  agenteCampanas!: any;
  numeroReal !: string;


  MessageText : string = 'Asopagos.S.A le confirma: PIN   , VALOR $ , FECHA DE PAGO PERIODO  .';
  Type : string = 'MASSIVE';
  FlashSMS : number = 0;
  Devices !: string ;
  planillames !: string ;
  planillaanio !: string ;
  tipoDoc !: any;
  numDocu !: any;


  constructor( 
    private TipoDocumentoService : TipoDocumentoService,
    private clienteService : ClienteService,
    private detalleGestionService : DetalleGestionService,
    private gestionService : GestionService ,
    private estadoGestionService : EstadoGestionService,
    private contactoService : ContactoService,
    private loginService : LoginService,
    private usuarioService: UsuarioService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private PilaenlaceService: PilaenlaceService,
    private dialog : MatDialog,
    private router: Router,
    private fb : FormBuilder,
    private snackBar: MatSnackBar,
    private mensajeTextoService: MensajeTextoService,
    private validadoresService: ValidadoresService ) 
    { 
      this.crearFormulario()
    }





  ngOnInit(): void {

    this.clienteService.getClienteCambio().subscribe(data =>{
      this.dataSourceCli= new MatTableDataSource(data);
    });
 
    this.loginService.getUsuariosCambio().subscribe((data:any) =>{
      this.usuario=data;
     });

     let ParametrosDTO ={ loginAgente: this.usuario }


    this.usuarioService.buscarAgenteCampana(ParametrosDTO).subscribe(data =>{
      this.idCampanaE = data.idCampanaE;
      this.idUsuario = data.idUsuario;   
      this.idEmpresa = data.idEmpresa;
      this.hostIp = data.hostIp;
      this.clienteSelec();
      this.gestionHistorico();
      this.contactoUltimo();
    });



    const askEstadoExtension ={  loginAgente : this.usuario }

    this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe(data =>{
      this.extension=data.idExtension;
      this.numRealMarcado=data.numeroOrigen;
    });  

    
    this.clienteService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    })

    this.clienteService.getcallid().subscribe(data =>{
      this.callid=data;
    });
    


  }  

  crearFormulario(){
  
    this.clienteService.getnumeroReal().subscribe(data=>{
      this.numeroReal=data;
    })

    this.formGuardar = this.fb.group({
    'observacionD': ['', [Validators.required,Validators.minLength(4)]],
    'numeroreal': [this.numeroReal,[Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
    'tipificacioP': ['', [Validators.required, this.validadoresService.validatetipo ]],
    'tipificacioH': ['', [Validators.required, this.validadoresService.validatetipo ]]
    });

    this.formContacto = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'telPrincipal': new FormControl(''),
      'telSecundario':  new FormControl(''),
      'telCelular': new FormControl(''),
     });

  
  }
  

  clienteSelec(){

    //this.tipoGestionP = 0
    //this.tipoGestionH = 0
    const parametros= { tipoDoc:this.tipoDocumento, nroDoc:this.nroDocumento, prueba:this.nroDocumento }
    
    this.clienteService.getIdClienteCambio().subscribe(data=>{
      this.idClienteP= data

   const cliente= { idCliente:this.idClienteP }
    this.clienteService.clientePorId( cliente ).subscribe(data =>{  
        this.clienteService.setClienteCambio(data)
        this.dataSourceCli= new MatTableDataSource(data);
        this.idZona = data[0].divipola?.idZona;
        this.tipoDoc = data[0].tipoDocumento?.tipoDoc;
        this.numDocu = data[0].nroDocumento;

    });

  });
  }


  abrirDialogo(cliente ?: Cliente){
    this.dialog.open(ClienteDialogoComponent,{
      width: '350px',
      data: cliente
    });
  }





  gestionHistorico(){

    
    this.tipoLlamada= 0;
    const parametros= { nroDoc:this.nroDocumento, idEmpresa:this.idEmpresa, 
      tipoLlamada:this.tipoLlamada, idEstadoPadre:this.tipoGestionP,
      idCliente:this.idClienteP }

    //HISTORICO
    this.detalleGestionService.detalleHistoricoS(parametros).subscribe(data =>{
      this.dataSourceHisto= new MatTableDataSource(data);
      this.dataSourceHisto.sort = this.sort;
      this.dataSourceHisto.paginator = this.paginator;
    });
        //TIPIFICACIÓN
   this.tipoGestion$=this.estadoGestionService.estadoGestionPadre(parametros);


  }

  tipoGestion(tipoGestionP:number){
    this.idEstadoP= tipoGestionP;
    this.tipoGestionH = null;
    this.idEstadoH= this.tipoGestionH;
    const parametros= {  idEstadoPadre:this.tipoGestionP , tipoLlamada:this.tipoLlamada, }

    this.subTipoGestion$=this.estadoGestionService.estadoGestionHijo(parametros);   

    this.estadoGestionService.estadoGestionHijo(parametros).subscribe(data=>{

      if(Array.isArray(data) && data.length > 0){
      }else {
        this.tipoGestionH = 0;
        this.idEstadoH = 0;
        this.idEstadoH=this.tipoGestionP;
      }
    });

    if(this.idEstadoH==0)
    {
      this.idEstadoH=this.tipoGestionP;
    }
  }


  subtipoGestion(tipoGestionH:number){
    this.idEstadoH= tipoGestionH;
  }


//LISTA DE CONTACTO

  contactoUltimo(){
    const parametros= { idCliente: this.idClienteP }

    this.contactoService.filtroContacto(parametros).subscribe(data =>{
      this.formContacto = this.fb.group({
      'nombre': [data.nombre, [Validators.required,Validators.minLength(4),Validators.maxLength(16)]],
      'correo': [data.correoElectronico,[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      'telPrincipal': [data.numeroContacto,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'telSecundario': [data.telefonoDirecto,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'telCelular': [data.telefonoCelular,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
     });
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
  get observacionDNoValido() {
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




  guardarGestion(){  
    let campana = new Campana
    campana.idCampana = this.idCampanaE

    let ext = new Extension
    ext.extension = this.extension;


    let usuario = new Usuario
    usuario.idUsuario = this.idUsuario

    
    let cliente = new Cliente();
    cliente.idCliente = this.idClienteP;

    let divi = new Divipola();
    divi.idZona = this.idZona;

    let estadoGestion = new EstadoGestion();
    estadoGestion.idEstadoGestion= this.idEstadoP;

    let estadoGestionH = new EstadoGestion();
    estadoGestionH.idEstadoGestion= this.idEstadoH;

    console.log(estadoGestion,'gestion normal-1')
    console.log(estadoGestionH,'gestion normal-2')

    
    
    
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
    gestion.callId = this.callid
    
    gestion.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    gestion.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

    console.log(gestion,'gestion normal')
  
    this.gestionService.guardarGestionS(gestion).subscribe( ()=> {
      this.clienteService.setMensajecambio('SE REGISTRÓ');
      this.clienteService.setFormCambio(this.cardCliente)
    });

    const askEstadoExtension ={  loginAgente : this.usuario }
    this.detalleGestionService.cantidadGestion(askEstadoExtension).subscribe(data =>{
      this.gestionService.setGestionCambio(data);
    });
  
    this.router.navigate(['filtroEntrante']);
  
  
  }

  mensajeTexto(){

    const parametros= { MessageText: this.MessageText, Type:this.Type, 
                        FlashSMS: this.FlashSMS, Devices:this.formContacto.value['telCelular']  }

    this.mensajeTextoService.gestionHistoricoS(parametros).subscribe(data=>{
    this.clienteService.setMensajecambio('ENVIADO SMS');
    }
    )    
  }


  cancelarGestion(){
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
    this.idClienteP = null;
    this.idEstadoP = null;
    }

    /*PLANILLAS PILA */
    planillaColumns: string[] = ['tipoPlanilla','numeroPlanilla','numeroPin','valorPago','fechaPago','periodoMes','periodoAnio'];
    dataSourcePla !: MatTableDataSource<Planillas>;

  buscarPlanilla(){

    this.PilaenlaceService.buscarPlanilla(this.tipoDoc, this.numDocu, this.planillaanio , this.planillames)
    .subscribe( (data:any) =>{
     if (data.codigoMensaje==='01'){
      this.clienteService.setMensajecambio('NO ACTIVAS PARA PAGO');

     } else {
     const respuestaString = JSON.stringify(data);
     const respuestaArray: Planillas[] = JSON.parse(respuestaString);
     this.dataSourcePla= new MatTableDataSource(data.planillas);
    }
    });
    

  }


    ngOnDestroy() {
      // Desuscripción para evitar fugas de memoria
      this.subscripcion.unsubscribe();
    }

    
 



}
