import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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

@Component({
  selector: 'app-entrantes',
  templateUrl: './entrantes.component.html',
  styleUrls: ['./entrantes.component.css']
})
export class EntrantesComponent implements OnInit, OnDestroy{

  clienteColumns: string[] = ['razonSocial','tipoDocumento.tipoDoc','nroDocumento','divipola.nombre',
  'divipola.idZonapadre.nombre','correo','telefonoCelular','telefonoFijo','acciones'];
  dataSourceCli !: MatTableDataSource<Cliente>; 

  detalleGestionColumns: string[] = ['fecha','usuario','campana','tipo','subtipo','observacion','numero'];
  dataSourceHisto !: MatTableDataSource<FiltroDetalleGestionDTO>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cantidad: number = 0;


  private subscripcion : Subscription = new Subscription();
  tipoDocumento !: string;
  tipoLlamada !: number;
  idContactoP   !: number;
  gestionPadre !: number;
  gestionHijo !: number;
  panelOpenState = false;
  tipoGestionP !: number;
  tipoGestionH !: number;

  nombreC !:String;
  correoC !:String;
  telPrincipalC !:String;
  telSecundarioC !:String;
  telCelularC !:String;
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






  constructor( 
    private TipoDocumentoService : TipoDocumentoService,
    private clienteService : ClienteService,
    private detalleGestionService : DetalleGestionService,
    private gestionService :GestionService ,
    private estadoGestionService :EstadoGestionService,
    private contactoService :ContactoService,
    private loginService :LoginService,
    private usuarioService: UsuarioService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private router: Router,
    private snackBar: MatSnackBar) { }





  ngOnInit(): void {

    this.loginService.getUsuariosCambio().subscribe((data:any) =>{
      this.usuario=data;
     });

     let FiltroEntranteDTO ={ loginAgente: this.usuario }

    this.usuarioService.buscarAgenteCampana(FiltroEntranteDTO).subscribe(data =>{
      this.idCampanaE=data.idCampanaE;
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
    
   

    

    this.form = new FormGroup({
      'id': new FormControl(0),
      'razonSocial': new FormControl(''),

    });

    this.formGuardar = new FormGroup({
      'observacionD': new FormControl('')
    });

    this.formContacto = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'correo': new FormControl(''),
      'telPrincipal': new FormControl(''),
      'telSecundario': new FormControl(''),
      'telCelular': new FormControl(''),
    });



    

  }

  

  clienteSelec(){

    this.tipoGestionP = 0
    this.tipoGestionH = 0
    const parametros= { tipoDoc:this.tipoDocumento, nroDoc:this.nroDocumento, prueba:this.nroDocumento }
    
    this.clienteService.getClienteCambio().subscribe(data=>{
      this.idClienteP= data
      
    

    const cliente= { idCliente:this.idClienteP }
    this.clienteService.clientePorId( cliente ).subscribe(data =>{
      
        this.dataSourceCli= new MatTableDataSource(data);

    });

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
    this.idEstadoH= this.tipoGestionH;
    const parametros= {  idEstadoPadre:this.tipoGestionP , tipoLlamada:this.tipoLlamada, }


    this.subTipoGestion$=this.estadoGestionService.estadoGestionHijo(parametros);
    
    if(this.idEstadoH==0)
    {
      this.idEstadoH=tipoGestionP;
    }
  }


  subtipoGestion(tipoGestionH:number){
    this.idEstadoH= tipoGestionH;
  }


//LISTA DE CONTACTO

  contactoUltimo(){
    const parametros= { idCliente: this.idClienteP }

    this.contactoService.filtroContacto(parametros).subscribe(data =>{
     this.formContacto = new FormGroup({
      'nombre': new FormControl(data.nombre),
      'correo': new FormControl(data.correoElectronico),
      'telPrincipal': new FormControl(data.numeroContacto),
      'telSecundario': new FormControl(data.telefonoDirecto),
      'telCelular': new FormControl(data.telefonoCelular)
    });
    });
  }





  guardarGestion(){  
    let campana = new Campana
    campana.idCampana = this.idCampanaE

    let usuario = new Usuario
    usuario.idUsuario = this.idUsuario

    
    let cliente = new Cliente();
    cliente.idCliente = this.idClienteP;
    

    let estadoGestion = new EstadoGestion();
    estadoGestion.idEstadoGestion= this.idEstadoP;

    let estadoGestionH = new EstadoGestion();
    estadoGestionH.idEstadoGestion= this.idEstadoH;
    
    
    let det = new DetalleGestion();
    det.observacion = this.formGuardar.value['observacionD'];
    det.usuario = usuario;
    det.estadoGestion = estadoGestionH;
    det.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.ip = this.hostIp;
    det.usuarioAct = this.usuario;
    this.detalleGestion.push(det);

    let cont = new Contacto();
    cont.nombre = this.formContacto.value['nombre'];
    cont.correoElectronico = this.formContacto.value['correo'];
    cont.numeroContacto = this.formContacto.value['telPrincipal'];
    cont.telefonoDirecto = this.formContacto.value['telSecundario'];
    cont.telefonoCelular = this.formContacto.value['telCelular'];
    cont.cliente = cliente;
    this.contacto.push(cont);


    let gestion = new Gestion();
    gestion.cliente = cliente;
    gestion.agente = usuario;
    gestion.listaDetalleGestion = this.detalleGestion;
    gestion.listaContacto = this.contacto;
    gestion.estadoGestion = estadoGestion;
    gestion.campana = campana;
    gestion.fechaGestion= new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  

    this.gestionService.guardarGestionS(gestion).subscribe( ()=> {
      this.clienteService.setMensajecambio('SE REGISTRÓ');
      this.clienteService.setFormCambio(this.cardCliente)
    });
  
    this.router.navigate(['filtroCliente']);
  
  
  }


  cancelarGestion(){
    this.clienteService.setFormCambio(this.cardCliente)
    this.clienteService.setMensajecambio('SE CANCELO');
    this.router.navigate(['filtroCliente']);
    this.snackBar.open("SE CANCELÓ", "Aviso", { duration: 2000 });

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

    ngOnDestroy() {
      // Desuscripción para evitar fugas de memoria
      this.subscripcion.unsubscribe();
    }

 



}
