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
  AgenteDTO!: AgenteDTO;
  minDate!: Date;
  maxDate!: Date;


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



  constructor( 
    private comercialGestionService : ComercialGestionService,
    private tipoDocumentoService : TipoDocumentoService,
    private divipolaService : DivipolaService,
    private motivoService : MotivoService,
    private cicloVidaService : CicloVidaService,
    private estadoGestionService : EstadoGestionService,
    private loginService : LoginService,
    private usuarioService: UsuarioService,
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
       console.log(ParametrosDTO, "hola Mundo2")

       this.usuarioService.buscarAgenteCampana(ParametrosDTO).subscribe(data =>{
        console.log(data, "hola Mundo22")
         this.idCampanaE = data.idCampanaE;
         this.idUsuario = data.idUsuario;   
         this.idEmpresa = data.idEmpresa;
         this.hostIp = data.hostIp;
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

    private subscripcion : Subscription = new Subscription();

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  displayedColumns: string[] = ['idDetalleGestionComercial','fechaGestion', 'fechaGestionCargue', 'idAgente', 'tipoDocumentoCliente','nroDocumentoCliente',
  'razonSocialCliente', 'nombreContacto', 'numeroContacto', 'celularContacto','correoElectronicoContacto','ciudadCliente', 'direccionCliente', 'nombreMotivo','regProyectadosCliente',
  'nombreEstadoGestion', 'regObtenidosCliente', 'observacionDetGestion', 'nroGestionRealizadaDetGestion','compromisosDetGestion',
  'ciclodeVida', 'activar'];
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
      'tipo': new FormControl(''),
      'documento': ['', [Validators.required,Validators.minLength(4)]],
      'empresa': ['', [Validators.required,Validators.minLength(4)]],
      'contacto' : ['', [Validators.required,Validators.minLength(4)]],
      'telefono': ['', [Validators.required,Validators.minLength(4)]],
      'celular': ['', [Validators.required,Validators.minLength(4)]],
      'correo': ['', [Validators.required,Validators.minLength(4)]],
      'direccion': ['', [Validators.required,Validators.minLength(4)]],
      'registros': ['', [Validators.required,Validators.minLength(4)]],
      'gestionrealizada': ['', [Validators.required,Validators.minLength(4)]],
      'observacion': ['', [Validators.required,Validators.minLength(4)]],
      'regobtenidos': ['', [Validators.required,Validators.minLength(4)]],
      'gesrealizada': ['', [Validators.required,Validators.minLength(4)]],
      'compromiso': ['', [Validators.required,Validators.minLength(4)]],
            });
  }

  guardarGestion(){

    console.log(this.form.value['documento'],'pruebas1')
    console.log(this.maxDate,'xx1')

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
    
    
    let det = new DetalleGestion();
    det.observacion = this.form.value['observacionD'];
    det.numRealMarcado = this.form.value['numeroreal'];
    det.usuario = usuario;
    det.estadoGestion = estadoGestionH;
    det.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    det.ip = this.hostIp;
    det.usuarioAct = this.usuario;
    det.extension = ext;
    //this.detalleGestion.push(det);

    let cont = new Contacto();
    cont.nombre = this.form.value['nombre'];
    cont.correoElectronico = this.form.value['correo'];
    cont.numeroContacto = this.form.value['telPrincipal'];
    cont.telefonoDirecto = this.form.value['telSecundario'];
    cont.telefonoCelular = this.form.value['telCelular'];
    cont.cliente = cliente;
    cont.usuario = usuario;
    cont.divipola = divi;
    //this.contacto.push(cont);


    let gestion = new Gestion();
    gestion.cliente = cliente;
    gestion.agente = usuario;
    //gestion.listaDetalleGestion = this.detalleGestion;
    //gestion.listaContacto = this.contacto;
    gestion.estadoGestion = estadoGestion;
    gestion.campana = campana;
    gestion.usuarioAct = this.usuario;
    gestion.ipAct = this.hostIp
    gestion.flagGestionSucursal = false
    
    gestion.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    gestion.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));

  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
   }

}
