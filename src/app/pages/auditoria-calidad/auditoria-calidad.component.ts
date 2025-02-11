import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import * as moment from 'moment';
import { Observable, switchMap } from 'rxjs';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { FiltroDetalleGestionDTO } from 'src/app/_model/filtroDetalleGestionDTO';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { Cliente } from 'src/app/_model/cliente';
import { MonitoreoGrabaciones } from 'src/app/_model/monitoreoGrabaciones';
import { MonitoreoPlandeaccion } from 'src/app/_model/monitoreoPlandeaccion';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { Usuario } from 'src/app/_model/usuario';
import { Usuarios } from 'src/app/_model/usuarios';
import { ClienteService } from 'src/app/_services/cliente.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { LoginService } from 'src/app/_services/login.service';
import { MonitoreoGrabacionesService } from 'src/app/_services/monitoreo-grabaciones.service';
import { MonitoreoPlanService } from 'src/app/_services/monitoreo-plan.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { UsuariosMigraService } from 'src/app/_services/usuarios-migra.service';
import { ValidadoresService } from 'src/app/_services/validadores.service';
import { EnvioCorreoService } from 'src/app/_services/envio-correo.service';

interface Element {
  name: string;
  value: number;
  checked?: boolean; 
}


@Component({
    selector: 'app-auditoria-calidad',
    imports: [RouterOutlet,
        MatCard,
        MatCardModule,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatTableModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatCardActions,
        MatButton,
        MatSelect,
        MatOption,
        MatIcon,
        MatPaginatorModule,
        MatDividerModule,
        AsyncPipe,
        CommonModule,
        MatCheckboxModule,
        FormsModule
    ],
    templateUrl: './auditoria-calidad.component.html',
    styleUrl: './auditoria-calidad.component.scss'
})
export class AuditoriaCalidadComponent implements OnInit{

  agenteDTO!: AgenteDTO;
  parametrosDTO!: ParametrosDTO;
  formBuscar!: FormGroup;
  tipoDocumento: string = 'CC';
  idCliente   !: number;
  correo !:string;
  nombretotal !:string;
  tipoDocumento$ !: Observable<TipoDocumento[]>;

  clienteColumns = ['razonSocial', 'tipoDocumento.tipoDoc', 'nroDocumento', 'divipola.nombre',
                    'divipola.idZonapadre.nombre', 'correo', 'telefonoCelular', 'telefonoFijo' ];
  dataSourceCli !: MatTableDataSource<Cliente>;

  detalleGestionColumns: string[] = ['fecha', 'usuario', 'campana', 'tipo', 'subtipo', 'observacion', 'numero'];
  dataSourceHisto !: MatTableDataSource<FiltroDetalleGestionDTO>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cantidad: number = 0;


  idPlanAccion : number = 1;
  idUsuario !: number;
  idUsuarioC !: number;
  canalComu : string = 'LLAMADA';
  calificacion : number = 0;
  plandeAccion$ !: Observable<MonitoreoPlandeaccion[]>;
  usuarios$ !: Observable<Usuario[]>;
  usuariosMigra$ !: Observable<Usuarios[]>;
  formGuardar!: FormGroup;

 


  displayedColumns: string[] = ['name', 'value']; 
  dataSource: Element[] = [
    { name: 'ETIQUETA Y PROTOCOLO', value: 10, checked: false },
    { name: 'CORDIALIDAD E IMAGEN DEL SERVICIO', value: 25, checked: false },
    { name: 'CONOCIMIENTO DEL PRODUCTO Y MANEJO DE LA INFORMACIÓN', value: 25, checked: false },
    { name: 'ORIENTACIÓN AL CLIENTE', value: 15, checked: false },
    { name: 'DOCUMETACIÓN Y/O TIPIFICACIÓN EN APLICATIVOS', value: 10, checked: false },
    { name: 'GESTON COMERCIAL', value: 15, checked: false }
  ];

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private clienteService: ClienteService,
    private detalleGestionService: DetalleGestionService,
    private monitoreoPlanService: MonitoreoPlanService,
    private monitoreoGrabacionesService: MonitoreoGrabacionesService,
    private usuarioService: UsuarioService,
    private UsuariosMigraService: UsuariosMigraService,
    private loginService: LoginService,
    private EnvioCorreoService: EnvioCorreoService,
    private fb: FormBuilder,
    private validadoresService: ValidadoresService,
    private snackBar: MatSnackBar,
  ){
    this.crearFormulario();
    this.actualizaSuma();
  }


 

  
  ngOnInit(): void {

    this.agenteDTO = this.loginService.agenteDTO;
    this.idUsuarioC = this.agenteDTO.idUsuario ?? 0;

    this.tipoDocumento$ = this.tipoDocumentoService.listar();
    this.plandeAccion$  = this.monitoreoPlanService.listar();
    this.usuarios$ = this.usuarioService.listarCalidad();
    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    })
  }

  crearFormulario(){

    this.formBuscar = new FormGroup({
      'nroDocumento': new FormControl('')
    });

    this.formGuardar = this.fb.group({
      'observacionD': ['', [Validators.required, Validators.minLength(4)]],
      'planAccion': [this.idPlanAccion, [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      'idUsuario': ['', [Validators.required, this.validadoresService.validatetipo]],
      'canalComu': [this.canalComu, [Validators.required, this.validadoresService.validatetipo]],
      'califica':[{ value: this.calificacion, disabled: true },[Validators.required]]
    });
  
  }
  
  buscarCliente() {
    this.parametrosDTO = { tipoDoc: this.tipoDocumento, nroDocumento: this.formBuscar.value['nroDocumento'] }

    this.clienteService.filtroCliente(this.parametrosDTO).pipe(
      switchMap(data =>{
        this.dataSourceCli = new MatTableDataSource(data);
        this.idCliente= data[0].idCliente ?? 0 ;
        this.parametrosDTO = { idCliente: this.idCliente };
        return this.detalleGestionService.detalleHistorico(this.parametrosDTO);
      })
    ).subscribe(dataHis =>{

     this.dataSourceHisto = new MatTableDataSource(dataHis);
     this.dataSourceHisto.sort = this.sort;
     this.dataSourceHisto.paginator = this.paginator;

    });

    this.formGuardar.patchValue({
      observacionD: ''
    });
  }

  actualizaSuma() {
    this.calificacion = this.dataSource.reduce((sum, element) => {
      return element.checked ? sum : sum + element.value;
    }, 0);
    this.formGuardar.get('califica')!.setValue(this.calificacion);
  }

  guardarGestion() {
    console.log(this.nombretotal,'this.nombretotal' )
    console.log(this.correo,'this.nombretotal' )
    console.log(this.idUsuario,'this.nombretotal' )
    let usuarioc = new Usuario();
    usuarioc.idUsuario = this.idUsuarioC;

    let usuario = new Usuario();
    usuario.idUsuario = this.idUsuario;

    let cliente = new Cliente();
    cliente.idCliente = this.idCliente;

    let plan = new MonitoreoPlandeaccion();
    plan.idPlan = this.idPlanAccion;


    let moni = new  MonitoreoGrabaciones();
    moni.fechaMonitoreo= moment().format('YYYY-MM-DD HH:mm:ss');
    moni.usuarioc = usuarioc;
    moni.usuario = usuario;
    moni.cliente = cliente;
    moni.monitoreoPlandeaccion = plan;
    moni.canalComunicacion = this.canalComu;
    moni.monitoreoObservacion = this.formGuardar.value['observacionD'];
    moni.calificacionTotal = this.calificacion;

    console.log(moni,'guardar')
    this.monitoreoGrabacionesService.registrar(moni).subscribe(() => {
      this.clienteService.setMensajecambio('SE REGISTRÓ');
    });

   
      const EnvioCorreo = {
        email: 'jaimev_tec@jaimetorres.net',
        subject: 'Calidad',
        nombre: 'Jaime vélez',
        mensaje: 'mensaje',
        template: 'felicitacion',
      };

    this.EnvioCorreoService.enviarCalidad(EnvioCorreo).subscribe(data =>{
      console.log(data,'correos')
    });


   }

   onAgenteChange(event: any) {
    console.log(event.value.usuario,'Usuario' )
    this.parametrosDTO = { loginAgente: event.value.usuario };
    this.UsuariosMigraService.usuariosCalidad(this.parametrosDTO).subscribe( data =>{
    this.correo = data.email ?? '' ;
    this.nombretotal = `${event.value.primerNombre ?? ''} ${event.value.primerApellido ?? ''}`;
    this.idUsuario = event.value.idUsuario
    console.log(this.nombretotal,'this.nombretotal' )


    });

  }
}
