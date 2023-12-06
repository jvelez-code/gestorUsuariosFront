import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
import { Campana } from 'src/app/_model/campanas';
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




@Component({
  selector: 'app-gestion-comercial',
  templateUrl: './gestion-comercial.component.html',
  styleUrls: ['./gestion-comercial.component.css']
})
export class GestionComercialComponent implements OnInit, OnDestroy {


  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  form!: FormGroup;
  ParametrosDTO: any;
  detalleGestion: DetalleGestion [] = [];
  contacto : Contacto [] = [];
  detalleGestionComercial : DetalleGestionComercial [] = [];
  AgenteDTO!: AgenteDTO;
  minDate!: Date;
  maxDate!: Date;
  selectedDate1!: Date;
  selectedDate2!: Date;


  private subscripcion : Subscription = new Subscription();
  tipoLlamada !: number;
  idContactoP   !: number;
  gestionPadre !: number;
  gestionHijo !: number;
  panelOpenState = false;
  tipoGestionP !: number ;
  tipoGestionH !: any;



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
  gestionRelizada : string ='0';



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
    private snackBar: MatSnackBar ) 
    { 
      this.crearFormulario();
      const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
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
     console.log(this.ParametrosDTO, "hola Mundo4")
     this.estadoComercial$ = this.estadoGestionService.estadoComercial(this.ParametrosDTO)
      // this.estadoGestionService.estadoComercial(this.ParametrosDTO).subscribe(data =>{
      //   console.log(data,'hola mundo')
      // });

    }



  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  displayedColumns: string[] = ['fidelizacion','idDetalleGestionComercial','fechaGestion', 'fechaGestionCargue', 'idAgente', 'tipoDocumentoCliente','nroDocumentoCliente',
  'razonSocialCliente', 'nombreContacto', 'numeroContacto', 'celularContacto','correoElectronicoContacto','ciudadCliente', 'direccionCliente', 'nombreMotivo','regProyectadosCliente',
  'nombreEstadoGestion', 'regObtenidosCliente', 'observacionDetGestion', 'nroGestionRealizadaDetGestion','compromisosDetGestion',
  'ciclodeVida', 'acciones'];

  dataSource!: MatTableDataSource<GestionComercialDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedValue !: string;
  selectedCar !: string;

  buscar() {

     this.fechaparametro1 = moment(this.range.value.start).format('YYYY-MM-DD 00:00:01');
     this.fechaparametro2 = moment(this.range.value.end).format('YYYY-MM-DD 23:59:59');

    const parametrosDTO ={ fechaInicial: this.fechaparametro1, fechaFinal: this.fechaparametro2 }
    this.comercialGestionService.gestionComercial(parametrosDTO).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


  }



  crearFormulario(){

    this.form = this.fb.group ({

      'documento': ['8080', [Validators.required,Validators.minLength(4)]],
      'empresa': ['ASOPAGOS', [Validators.required,Validators.minLength(4)]],
      'contacto' : ['DANA', [Validators.required,Validators.minLength(4)]],
      'telefono': ['6015778899', [Validators.required,Validators.minLength(4)]],
      'celular': ['3504445566', [Validators.required,Validators.minLength(4)]],
      'correo': ['pruebas@gmail.com', [Validators.required,Validators.minLength(4)]],
      'direccion': ['calle 8', [Validators.required,Validators.minLength(4)]],
      'registros': ['7777', [Validators.required,Validators.minLength(4)]],
      'gestionrealizada': ['1111', [Validators.required,Validators.minLength(4)]],
      'observacion': ['Llamar el cliente', [Validators.required,Validators.minLength(4)]],
      'regobtenidos': ['8888', [Validators.required,Validators.minLength(4)]],
      'gesrealizada': ['2222', [Validators.required,Validators.minLength(4)]],
      'compromiso': ['N/A N/A', [Validators.required,Validators.minLength(4)]],

            });
  }


  buscarCliente(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      const parametrosDTO= {tipoDoc: 'CC', nroDocumento: "8080"}    
  
    this.clienteService.filtroCliente(parametrosDTO).subscribe( data =>{
     
    if(data){  
    this.idClienteP =data.idCliente;
    console.log(this.idClienteP,'CLIENTE')

      } 
      else {
        console.log(this.idClienteP,'CLIENTE2')
    this.router.navigate(['clientes']);    
  }
  });

      setTimeout(() => {
        resolve();
      }, 2000); // Simulando una operación asincrónica que toma 2 segundos.
    });
  }


  abrirFidelizacion(gestionComercialDto ?: GestionComercialDto){
    console.log('Hola De', gestionComercialDto)
    this.dialog.open(FidelizacionUsuComponent,{
      width: '700px',
      data: gestionComercialDto
    });
  }

  abrirCicloVida(gestionComercialDto ?: GestionComercialDto){
    console.log('Hola De', gestionComercialDto)
    this.dialog.open(CicloVidaComponent,{
      width: '350px',
      data: gestionComercialDto
    });
  }





  async guardarGestion(){  

    try {

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
    
    
    let det = new DetalleGestion();
    det.observacion = this.form.value['observacion'];
    det.numRealMarcado = this.form.value['celular'];
    det.usuario = usuario;
    det.estadoGestion = estadoGestionH;
    det.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.ip = this.hostIp;
    det.usuarioAct = this.usuario;
    det.extension = ext;
    this.detalleGestion.push(det);

    let cont = new Contacto();
    cont.nombre = this.form.value['contacto'];
    cont.correoElectronico = this.form.value['correo'];
    cont.numeroContacto = this.form.value['celular'];
    cont.telefonoDirecto = this.form.value['telefono'];
    cont.telefonoCelular = this.form.value['celular'];
    cont.cliente = cliente;
    cont.usuario = usuario;
    cont.divipola = divi;
    this.contacto.push(cont);

    let come = new DetalleGestionComercial();
    come.usuario = usuario;
    come.motivo = motivo;
    come.nroGestionRealizada = this.form.value['gesrealizada'];  
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

    console.log(gestion.listaDetalleGestionComercial,'gestion Comercial-1')
    console.log(gestion.listaDetalleGestion,'gestion Comercial-2')
  
    this.gestionService.guardarGestionComercial(gestion).subscribe( ()=> {
      this.clienteService.setMensajecambio('SE REGISTRÓ');
    });
  } 
  catch (error) {
    
    console.error('Error en la búsqueda del cliente:', error);
  }
  
  
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
   }

}
