import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';




import { ClienteService } from 'src/app/_services/cliente.service';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { CrmCasosService } from 'src/app/_services/crm-casos.service';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { CrmDetallesService } from 'src/app/_services/crm-detalles.service';
import * as moment from 'moment';
import { CrmCasos } from 'src/app/_model/crmCasos';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente } from 'src/app/_model/cliente';
import { LoginService } from 'src/app/_services/login.service';
import { CrmDetalle } from 'src/app/_model/crmDetalle';
import { Usuario } from 'src/app/_model/usuario';
import { CrmEstado } from 'src/app/_model/crmEstado';
import { CrmEstadosService } from 'src/app/_services/crm-estados.service';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CasoClienteComponent } from './caso-cliente/caso-cliente.component';
import { CasoNuevoComponent } from './caso-nuevo/caso-nuevo.component';
import { FiltroCrmDetallesDTO } from 'src/app/_dto/FiltroCrmDetallesDTO';



@Component({
    selector: 'app-crm-cuentas',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatGridListModule,
        CommonModule,
        FormsModule,
        MatDividerModule,
        MatPaginator,
    ],
    templateUrl: './crm-cuentas.component.html',
    styleUrl: './crm-cuentas.component.scss'
})
export class CrmCuentasComponent implements OnInit {

  clienteColumns = ['razonSocial', 'tipoDocumento.tipoDoc', 'nroDocumento', 'divipola.nombre',
                    'divipola.idZonapadre.nombre', 'correo', 'telefonoCelular', 'telefonoFijo', 'acciones'];
  dataSourceCli !: MatTableDataSource<Cliente>;

  crmCasosColumns: string[] = ['idCaso','nroRealmarcado','fechaCaso', 'fechaVencimiento', 'fechaCierre', 'nombreCategoria','nombreSubcategoria','nombreTipologia', 
                               'nombreEstado','nombreNivel','nombreDepartamento','acciones'];
  dataSourceCasos!: MatTableDataSource<CrmCasos>;


  detalleCasosColumns: string[] = ['idDetalle', 'fechaDetalle', 'observacion', 'usuario'];
  dataSourceDeta!: MatTableDataSource<CrmDetalle>;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorDet!: MatPaginator;

  formGuardar !: FormGroup;
  idCliente   !: number;
  fechaSumada !: string;
  fechafinal !: string;
  parametrosDTO !: ParametrosDTO;
  filtroCrmDetallesDTO !: FiltroCrmDetallesDTO
  usuario: Usuario[] = [];
  crmEstado!: CrmEstado[];
  crmCasos: CrmCasos[] = [];
  vistadetallescasos: boolean = false;
  idCaso !: number;
  nombreEstado!: string;
  activoEstado!: boolean;
  observacion !: string;
  idUsuario: any;


  constructor(
    private clienteService: ClienteService,
    private crmCasosService: CrmCasosService,
    private crmDetallesService: CrmDetallesService,
    private loginService: LoginService,
    private crmEstadosService: CrmEstadosService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.crearFormulario();

  }


  ngOnInit(): void {

    this.crmCasosService.getCrmCasosCambio().subscribe(data =>{
      this.dataSourceCasos = new MatTableDataSource(data);
      this.dataSourceCasos.paginator = this.paginator;
    });

    this.idUsuario = this.loginService.agenteDTO.idUsuario;

    this.crmEstadosService.listar().subscribe(data => {
      this.crmEstado = data;
    });

    this.clienteSelec();
    this.listarCasos();

  }

  crearFormulario(){

    this.formGuardar = this.fb.group({
      idEstado: ['2',[Validators.required]],
      observacion:['',[Validators.required, Validators.minLength(4)]],
    });
  }

  get observacionNoValido() {
    return this.formGuardar.get('observacion')?.invalid && this.formGuardar.get('observacion')?.touched
  }


  clienteSelec() {

    this.clienteService.getIdClienteCambio().subscribe(data => {
      this.idCliente = data

      const cliente = { idCliente: this.idCliente }
      this.clienteService.clientePorId(cliente).subscribe(data => {
        this.dataSourceCli = new MatTableDataSource(data);

      });

    }); 
  }

 


  listarCasos() {
      this.parametrosDTO = { idCliente: this.idCliente }
      this.crmCasosService.casosCliente(this.parametrosDTO).subscribe(data => {
      this.dataSourceCasos = new MatTableDataSource(data);
      this.dataSourceCasos.paginator = this.paginator;
    });
  }




  verDetalleCasos(idCaso: number, estadoCasos: string) {

    this.idCaso = idCaso;
    this.nombreEstado = estadoCasos;
    if (this.nombreEstado == 'CERRADO') {
      this.activoEstado = true;
    }
    this.vistadetallescasos = !this.vistadetallescasos;

    this.crmDetallesService.detalleCasos(this.idCaso).subscribe(data => {
      this.dataSourceDeta = new MatTableDataSource(data);
      this.dataSourceDeta.paginator = this.paginatorDet;
      this.crmDetallesService.setCrmDetalleCambio(data);
    });


  }







  aceptar() {

    this.parametrosDTO = {
      idCrmCaso: this.idCaso,
      idCrmEstado: this.formGuardar.value['idEstado'],
      idCliente: this.idCliente
    }

    this.filtroCrmDetallesDTO = { 
      fechaDetalle: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
      idCrmCaso: this.idCaso, 
      idUsuario: this.idUsuario, 
      observacion: this.formGuardar.value['observacion'],
      idCrmEstado: this.formGuardar.value['idEstado'],
      idCliente: this.idCliente
    }


    this.crmDetallesService.registrarDetalle(this.filtroCrmDetallesDTO).pipe(switchMap(() => {
      return this.crmDetallesService.detalleCasos(this.idCaso);
    })).subscribe(data => {
      this.dataSourceDeta = new MatTableDataSource(data);
      this.dataSourceDeta.paginator = this.paginatorDet;
    })

    this.crmCasosService.actualizaCaso(this.filtroCrmDetallesDTO).pipe(switchMap(()=>{
      return this.crmCasosService.casosCliente(this.parametrosDTO)
    })).subscribe(data=>{
      this.crmCasosService.setCrmCasosCambio(data);
      this.dataSourceCasos = new MatTableDataSource(data);
      this.dataSourceCasos.paginator = this.paginator;
    });

    this.activoEstado = true;

    setTimeout(() => {
      this.limpiarControles();
    }, 1000)
  }

  limpiarControles() {
    this.crmEstado = [];
    this.crmCasos = [];
    this.usuario = [];
    this.observacion = '';
    this.formGuardar.reset();
  }


  cancelarDet() {

      this.activoEstado = false;
      this.vistadetallescasos = !this.vistadetallescasos;              
      this.limpiarControles();
      this.listarCasos();
  }

  abrirCliente(cliente?: Cliente) {
    this.dialog.open(CasoClienteComponent, {
      width: '350px',
      data: cliente
    });
  }

  abrirCasoNuevo(cliente?: Cliente) {
    this.dialog.open(CasoNuevoComponent, {
      width: '1350px',
      data: cliente
    });
  }


}
