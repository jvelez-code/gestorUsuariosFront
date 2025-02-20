import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
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
import { FiltroDetalleGestionDTO } from 'src/app/_model/filtroDetalleGestionDTO';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/_services/login.service';
import { AgenteCampana } from 'src/app/_model/agenteCampana';
import { AgenteCampanaService } from 'src/app/_services/agente-campana.service';
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
import { Planillas } from 'src/app/_model/planillas';
import { Divipola } from 'src/app/_model/divipola';
import { ValidadoresService } from 'src/app/_services/validadores.service';
import { ClienteDialSalComponent } from './cliente-dial-sal/cliente-dial-sal.component';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { MatDivider } from '@angular/material/divider';
import { MatOption } from '@angular/material/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';


@Component({
    selector: 'app-saliente',
    templateUrl: './saliente.component.html',
    styleUrl: './saliente.component.scss',
    standalone: true,
    imports: [RouterOutlet, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatButton, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, NgFor, MatOption, MatDivider, AsyncPipe]
})
export class SalienteComponent implements OnInit, OnDestroy {

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
  parametrosDTO!: ParametrosDTO;
  tipoDocumento !: string;
  tipoLlamada !: number;
  idContactoP   !: number;
  gestionPadre !: number;
  gestionHijo !: number;
  panelOpenState = false;
  tipoGestionP !: number ;
  tipoGestionH !: any;

  nombreC !:string;
  correoC !:string;
  telPrincipalC !:string;
  telSecundarioC !:string;
  telCelularC !:string;
  callid !: string;
  cardCliente : boolean= false ;
  filaPar: boolean = true;

 
  parametros !: Parametros;
  gestion !: Gestion;
  cliente !: Cliente;
  estadoGestion !: EstadoGestion;

  detalleGestion !: DetalleGestion;
  contacto !: Contacto ;
  agenteDtos !: AgenteDTO;
  AgenteDTO!: AgenteDTO;


  idGestion   !: any;
  idContacto  !: any;
  idClienteP  !: any;
  idEstadoP   !: any;
  idEstadoH   !: any;
  idUsuario   !: any;
  usuario     !: any;
  nroDocumento   !: any;
  primerNombre   !: any;
  primerApellido   !: any;
  idEmpresa   !: any;
  pseudonimo  !: any;
  descripcion !: any;
  idCampanaE  !: any;
  nombreCamE  !: any;
  tipoLlamadaCamE   !: any;
  hostIp      !: any;
  extension   !: any;
  numRealMarcado !: any;
  idZona      !: any;
  
  
  

  
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
  tipoDoc !: any;
  numDocu !: any;

  /*MessageText : string = 'Asopagos.S.A le confirma: PIN   , VALOR $ , FECHA DE PAGO PERIODO  .';
  Type : string = 'MASSIVE';
  FlashSMS : number = 0;
  Devices !: string ;
  planillames !: string ;
  planillaanio !: string ;*/
  


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
      this.usuario = data;
     });

     this.gestionService.getIdGestionSaliente().subscribe(data =>{
      this.idGestion = data;
     })

     
     let ParametrosDTO ={ loginAgente: this.usuario , idGestion: this.idGestion }
     
     this.contactoService.contactoId(ParametrosDTO).subscribe(data =>{
      this.idContacto = data.idContacto;
     });


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
    this.dialog.open(ClienteDialSalComponent,{
      width: '350px',
      data: cliente
    });
  }





  gestionHistorico(){

    
    this.tipoLlamada= 1;
    const parametros= { nroDoc:this.nroDocumento, idEmpresa:this.idEmpresa, 
      tipoLlamada:this.tipoLlamada, idEstadoPadre:this.tipoGestionP,
      idCliente:this.idClienteP }

      this.parametrosDTO= { nroDocumento: this.nroDocumento, idEmpresa:this.idEmpresa, 
        tipoLlamada:this.tipoLlamada, idEstadoPadre:this.tipoGestionP,
        idCliente:this.idClienteP }

    //HISTORICO
    this.detalleGestionService.detalleHistorico(this.parametrosDTO).subscribe(data =>{
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
      'nombre': [data.nombre, [Validators.required,Validators.minLength(4),Validators.maxLength(128)]],
      'correo': [data.correoElectronico,[ Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
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

    if (this.formContacto.invalid) {
      return Object.values(this.formContacto.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }

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

    let gestion = new Gestion();
    gestion.idGestion = this.idGestion;
    //gestion.cliente = cliente;
    gestion.agente = usuario;
    //gestion.listaDetalleGestion = this.detalleGestion;
    //gestion.listaContacto = this.contacto;
    gestion.estadoGestion = estadoGestion;
    //gestion.campana = campana;
    gestion.usuarioAct = this.usuario;
    gestion.ipAct = this.hostIp
    gestion.flagGestionSucursal = false
    gestion.callid = this.callid    
    //gestion.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    gestion.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

   
    let det = new DetalleGestion();
    det.gestion = gestion;
    det.observacion = this.formGuardar.value['observacionD'];
    det.numRealMarcado = this.formGuardar.value['numeroreal'];
    det.usuario = usuario;
    det.estadoGestion = estadoGestionH;
    det.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.ip = this.hostIp;
    det.usuarioAct = this.usuario;
    det.extension = ext;
    
    // this.detalleGestionService.salienteDetalle(det).subscribe(()=>{

    // });




    let cont = new Contacto();
    cont.nombre = this.formContacto.value['nombre'];
    cont.correoElectronico = this.formContacto.value['correo'];
    cont.numeroContacto = this.formContacto.value['telPrincipal'];
    cont.telefonoDirecto = this.formContacto.value['telSecundario'];
    cont.telefonoCelular = this.formContacto.value['telCelular'];
    //this.contacto.push(cont);

 
    this.contactoService.salienteContacto(this.idContacto, cont ).subscribe(()=>{

    });


    this.gestionService.salienteGestion(this.idGestion, gestion).subscribe(()=>{
      

    })
    
    this.detalleGestionService.guardarSaliente( this.idGestion, det).subscribe( data =>{

    this.snackBar.open("SE REGISTRO", "Aviso", { duration: 2000 });

      setTimeout(() => {
      this.limpiarControles();
       }, 2000);
    });

 
    this.router.navigate(['filtroSaliente']);
  
  
  }

  

  cancelarGestion(){
    this.clienteService.setMensajecambio('SE CANCELO');
    this.router.navigate(['filtroSaliente']);
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
      
  }

  limpiarControles() {
    this.detalleGestion = new DetalleGestion;
    this.contacto = new Contacto;
    this.idClienteP = null;
    this.idEstadoP = null;
    }


    ngOnDestroy() {
      // Desuscripción para evitar fugas de memoria
      this.subscripcion.unsubscribe();
    }

    
 



}
