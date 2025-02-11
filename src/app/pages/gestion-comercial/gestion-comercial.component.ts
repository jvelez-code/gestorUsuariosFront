import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GestionComercialDto } from 'src/app/_dto/GestionComercialDto';
import { ComercialGestionService } from 'src/app/_services/comercial-gestion.service';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import * as moment from 'moment';
import { DivipolaDTO } from 'src/app/_dto/divipolaDTO ';
import { DivipolaService } from 'src/app/_services/divipola.service';
import { Motivo } from 'src/app/_model/motivoComercial';
import { MotivoService } from 'src/app/_services/motivo.service';
import { CicloVida } from 'src/app/_model/cicloVida';
import { CicloVidaService } from 'src/app/_services/ciclo-vida.service';
import { EstadoGestion } from 'src/app/_model/estadoGestion';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { LoginService } from 'src/app/_services/login.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Campana } from 'src/app/_model/campana';
import { Extension } from 'src/app/_model/extension';
import { Usuario } from 'src/app/_model/usuario';
import { Cliente } from 'src/app/_model/cliente';
import { Divipola } from 'src/app/_model/divipola';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { Contacto } from 'src/app/_model/contactos';
import { Gestion } from 'src/app/_model/gestion';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { ClienteService } from 'src/app/_services/cliente.service';
import { DetalleGestionComercial } from 'src/app/_model/detalleGestionComercial';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { CicloVidaComponent } from './ciclo-vida/ciclo-vida.component';
import { MatDialog } from '@angular/material/dialog';
import { FidelizacionUsuComponent } from './fidelizacion-usu/fidelizacion-usu.component';
import { ValidadoresService } from 'src/app/_services/validadores.service';
import { AsyncPipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker, MatDatepickerInput, MatDatepicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();



@Component({
    selector: 'app-gestion-comercial',
    templateUrl: './gestion-comercial.component.html',
    styleUrls: ['./gestion-comercial.component.scss'],
    imports: [RouterOutlet, MatTabGroup, MatTab, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatError, MatButton, MatIcon, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, MatSelect, MatOption, MatInput, MatDatepickerInput, MatDatepicker, MatDivider, AsyncPipe]
})
export class GestionComercialComponent implements OnInit, OnDestroy {

  


  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  formManual !: FormGroup;
  ParametrosDTO : any;
  detalleGestion : DetalleGestion [] = [];
  contacto : Contacto [] = [];
  detalleGestionComercial : DetalleGestionComercial [] = [];
  AgenteDTO !: AgenteDTO;
  minDate !: Date;
  maxDate !: Date;
  selectedDate1 !: Date;
  selectedDate2 !: Date;  
  minFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();


  private subscripcion : Subscription = new Subscription();
  tipoLlamada !: number;
  idContactoP   !: number;
  gestionPadre !: number;
  gestionHijo !: number;
  panelOpenState = false;
  tipoGestionP !: number ;
  tipoGestionH !: any;
  btoGuardar : boolean = true;
  btnReport: boolean = true;

  



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
  tipoDoc !: any;
  numDocu !: any;



  tipoDocumento$ !: Observable<TipoDocumento[]>;
  tipoDocumento : string = 'CC';
  divipola$ !: Observable<DivipolaDTO[]>;
  divipola : number = 184;
  motivo$ !: Observable<Motivo[]>;
  motivo : number = 1;
  cicloVida$ !: Observable<CicloVida[]>;
  cicloVida : number = 1;
  estadoComercial$ !: Observable<EstadoGestion[]>;
  estadoComercial : number = 4265;
  gestionRelizada : string ='1';

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month,))
  });
  



  constructor( 
    private comercialGestionService : ComercialGestionService,
    private tipoDocumentoService : TipoDocumentoService,
    private divipolaService : DivipolaService,
    private motivoService : MotivoService,
    private cicloVidaService : CicloVidaService,
    private estadoGestionService : EstadoGestionService,
    private loginService : LoginService,
    private usuarioService: UsuarioService,
    private gestionService : GestionService,
    private clienteService : ClienteService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private dialog : MatDialog,
    private fb : FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private validadoresService: ValidadoresService
    ) 
    { 
      this.crearFormulario();
    }



    ngOnInit(): void {  
      
      this.loginService.getUsuariosCambio().subscribe((data:any) =>{
      this.usuario=data;
     });

     let ParametrosDTO ={ loginAgente: this.usuario }


    this.usuarioService.buscarAgenteCampana(ParametrosDTO).subscribe(data =>{
      this.idCampanaE = data.idCampanaE;
      this.idUsuario = data.idUsuario;   
      this.idEmpresa = data.idEmpresa;
      this.hostIp = data.hostIp;
      
    });

    const askEstadoExtension ={  loginAgente : this.usuario }

    this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe(data =>{
      this.extension=data.idExtension;
      this.numRealMarcado=data.numeroOrigen;
    });  


   
      this.tipoDocumento$=this.tipoDocumentoService.buscar();
      this.divipola$= this.divipolaService.buscar();
      this.motivo$ = this.motivoService.listar();
      this.cicloVida$ = this.cicloVidaService.listar();

     this.ParametrosDTO ={ idEmpresa: 12 }
     this.estadoComercial$ = this.estadoGestionService.estadoComercial(this.ParametrosDTO)
    }



  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });



  fidelizacionColumnas: string[] = ['fidelizacion','idDetalleGestionComercial','fechaGestion', 'fechaGestionCargue', 'idAgente', 'tipoDocumentoCliente','nroDocumentoCliente',
  'razonSocialCliente', 'nombreContacto', 'numeroContacto', 'celularContacto','correoElectronicoContacto','ciudadCliente', 'direccionCliente', 'nombreMotivo','regProyectadosCliente',
  'nombreEstadoGestion', 'regObtenidosCliente', 'observacionDetGestion', 'nroGestionRealizadaDetGestion','compromisosDetGestion',
  'ciclodeVida', 'acciones'];

  dataSource!: MatTableDataSource<GestionComercialDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedValue !: string;
  selectedCar !: string;

  buscar() {

    if(this.range.value.start && this.range.value.end) {

     this.fechaparametro1 = moment(this.range.value.start).format('YYYY-MM-DD 00:00:01');
     this.fechaparametro2 = moment(this.range.value.end).format('YYYY-MM-DD 23:59:59');

    const parametrosDTO ={ fechaInicial: this.fechaparametro1, fechaFinal: this.fechaparametro2, idUsuario: this.idUsuario }
    this.btnReport = true;
    this.comercialGestionService.gestionComercial(parametrosDTO).subscribe(data =>{
      if(data.length > 0 ){
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.btnReport = true;
      } else { 
        this.snackBar.open('NO HAY DATOS EN LA FECHA', 'Aviso', {
        duration: 3000, 
      });
      }
      
    });

    this.comercialGestionService.comercialUsuario(parametrosDTO).subscribe(data =>{

    });

  } else {
    this.snackBar.open('INGRESE FECHAS', 'Aviso', {
      duration: 3000, 
    });
  }

  }



  crearFormulario(){

    this.formManual = this.fb.group ({

      'documento': ['', [Validators.required,Validators.minLength(4),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'empresa': ['', [Validators.required,Validators.minLength(4)]],
      'contacto' : ['', [Validators.required,Validators.minLength(4)]],
      'telefono':['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'celular': ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'correo': ['',[ Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      'direccion': ['', [Validators.required,Validators.minLength(4)]],
      'registros': ['1', [Validators.required,Validators.minLength(1)]],
      'tipificacioP': ['', [Validators.required, this.validadoresService.validatetipo ]],
      'fechaGestion': ['', [Validators.required, this.validadoresService.validatetipo ]],
      'observacion': ['Llamar el cliente', [Validators.required,Validators.minLength(4)]],
      'regobtenidos': ['1', [Validators.required,Validators.minLength(1),Validators.pattern('^[0-9]+$')]],
      'gesrealizada': ['1', [Validators.required,Validators.minLength(1),Validators.pattern('^[0-9]+$')]],
      'compromiso': ['PAGO', [Validators.required,Validators.minLength(4)]],

            });
  }

  get documentoNoValido() {
    return this.formManual.get('documento')?.invalid && this.formManual.get('documento')?.touched
  }
  get empresaNoValido() {
    return this.formManual.get('empresa')?.invalid && this.formManual.get('empresa')?.touched
  }
  get contactoNoValido() {
    return this.formManual.get('contacto')?.invalid && this.formManual.get('contacto')?.touched
  }
  get telefonoNoValido() {
    return this.formManual.get('telefono')?.invalid && this.formManual.get('telefono')?.touched
  }
  get celularNoValido() {
    return this.formManual.get('celular')?.invalid && this.formManual.get('celular')?.touched
  }
  get correoNoValido() {
    return this.formManual.get('correo')?.invalid && this.formManual.get('correo')?.touched
  }
  get direccionNoValido() {
    return this.formManual.get('direccion')?.invalid && this.formManual.get('direccion')?.touched
  }
  get registrosNoValido() {
    return this.formManual.get('registros')?.invalid && this.formManual.get('registros')?.touched
  }
  get observacionNoValido() {
    return this.formManual.get('observacion')?.invalid && this.formManual.get('observacion')?.touched
  }
  get regobtenidosNoValido() {
    return this.formManual.get('regobtenidos')?.invalid && this.formManual.get('regobtenidos')?.touched
  }
  get gesrealizadaNoValido() {
    return this.formManual.get('gesrealizada')?.invalid && this.formManual.get('gesrealizada')?.touched
  }
  get compromisoNoValido() {
    return this.formManual.get('compromiso')?.invalid && this.formManual.get('compromiso')?.touched
  }

  buscarCliente(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      const parametrosDTO= {tipoDoc: 'CC', nroDocumento: "8080"}    
  
    this.clienteService.filtroCliente(parametrosDTO).subscribe( data =>{
     
    if(data){  
    this.idClienteP =data[0].idCliente;
      } 
      else {
    this.router.navigate(['clientes']);    
  }
  });

      setTimeout(() => {
        resolve();
      }, 2000); // Simulando una operación asincrónica que toma 2 segundos.
    });
  }


  abrirFidelizacion(gestionComercialDto ?: GestionComercialDto ){
    this.dialog.open(FidelizacionUsuComponent,{
      width: '700px',
      data: gestionComercialDto
    });
  }

  abrirCicloVida(gestionComercialDto ?: GestionComercialDto, otraVariable: string ='45555'){
    this.dialog.open(CicloVidaComponent,{
      width: '350px',
      data: gestionComercialDto
    });
  }





  async guardarGestion(){  

  

    await this.buscarCliente();

    let campana = new Campana();
    campana.idCampana = this.idCampanaE

    let ext = new Extension();
    ext.extension = this.extension;

    let usuario = new Usuario();
    usuario.idUsuario = this.idUsuario
    
    let cliente = new Cliente();
    cliente.idCliente = this.idClienteP;

    let divi = new Divipola();
    divi.idZona = this.divipola;

    let estadoGestion = new EstadoGestion();
    estadoGestion.idEstadoGestion = this.estadoComercial;

    let estadoGestionH = new EstadoGestion();
    estadoGestionH.idEstadoGestion= this.estadoComercial;

    let motivo = new Motivo ();
    motivo.idMotivo = this.motivo;

    let ciclo = new CicloVida();
    ciclo.idCiclo = this.cicloVida;
    
    
    let det = new DetalleGestion();
    det.observacion = this.formManual.value['observacion'];
    det.numRealMarcado = this.formManual.value['celular'];
    det.usuario = usuario;
    det.estadoGestion = estadoGestionH;
    det.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.ip = this.hostIp;
    det.usuarioAct = this.usuario;
    det.extension = ext;
    this.detalleGestion.push(det);

    let cont = new Contacto();
    cont.nombre = this.formManual.value['contacto'];
    cont.correoElectronico = this.formManual.value['correo'];
    cont.numeroContacto = this.formManual.value['celular'];
    cont.telefonoDirecto = this.formManual.value['telefono'];
    cont.telefonoCelular = this.formManual.value['celular'];
    cont.cliente = cliente;
    cont.usuario = usuario;
    cont.divipola = divi;
    this.contacto.push(cont);

    
    let come = new DetalleGestionComercial();
    come.usuario = usuario;
    come.motivo = motivo;
    come.nroGestionRealizada = this.gestionRelizada;
    come.regProyectados = this.formManual.value['registros'];
    come.fechaGestion = this.fechaSeleccionada;
    come.regObtenidos = this.formManual.value['regobtenidos'];
    come.compromisos = this.formManual.value['compromiso'];
    come.nroGestionRealizada = this.formManual.value['gesrealizada'];  
    come.cicloVida = ciclo;
    this.detalleGestionComercial.push(come);





    let gestion = new Gestion();
    gestion.cliente = cliente;
    gestion.agente = usuario;
    gestion.listaDetalleGestion = this.detalleGestion;
    gestion.listaContacto = this.contacto;
    gestion.listaDetalleGestionComercial = this.detalleGestionComercial;
    gestion.estadoGestion = estadoGestion;
    gestion.campana = campana;
    gestion.usuarioAct = this.usuario;
    gestion.ipAct = this.hostIp
    gestion.flagGestionSucursal = false
    
    gestion.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    gestion.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    this.btoGuardar = true;
  
    this.gestionService.guardarGestionComercial(gestion).subscribe( ()=> {
      this.snackBar.open("SE REGISTRO", "Aviso", { duration: 2000 });
      this.router.navigate(['gestionComercial']);

      setTimeout(() => {
        this.btoGuardar = false;
        this.limpiarFormulario();
      }, 2000);
      
    });
  
  }



  limpiarFormulario() {
    this.detalleGestion = [];
    this.contacto = [];
    this.detalleGestionComercial = [];
    this.idClienteP = null;    
    this.formManual.get('documento')?.setValue('');
    this.formManual.get('empresa')?.setValue('');
    this.formManual.get('contacto')?.setValue('');
    this.formManual.get('telefono')?.setValue('');
    this.formManual.get('celular')?.setValue('');
    this.formManual.get('correo')?.setValue('');
    this.formManual.get('direccion')?.setValue('');   
  }


  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
   }

}
