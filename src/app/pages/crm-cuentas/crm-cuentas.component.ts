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
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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



@Component({
  selector: 'app-crm-cuentas',
  standalone: true,
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

  crmCasosColumns: string[] = ['idCaso','nroRealmarcado','fechaGestion', 
                               'fechaVencimiento', 'nombreCategoria','nombreSubcategoria','nombreTipologia', 
                               'nombreEstado','nombreNivel','nombreDepartamento','acciones'];
  dataSourceCasos!: MatTableDataSource<CrmCasos>;


  detalleCasosColumns: string[] = ['idDetalle', 'fechaDetalle', 'observacion', 'usuario.usuario'];
  dataSourceDeta!: MatTableDataSource<CrmDetalle>;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorDet!: MatPaginator;

  formBuscar!: FormGroup;

  idCliente   !: number;
  fechaSumada !: string;
  fechafinal !: string;
  parametrosDTO !: ParametrosDTO;
  usuario: Usuario[] = [];
  crmEstado!: CrmEstado[];
  crmCasos: CrmCasos[] = [];

  idClienteP   !: any;
  vistadetallescasos: boolean = false;
  idCaso !: number;
  idEstado: number = 2;
  nombreEstado!: string;
  activoEstado!: boolean;
  observacionCaso !: string;
  idUsuario: any;
  formObs !: FormGroup;


  constructor(
    private clienteService: ClienteService,
    private crmCasosService: CrmCasosService,
    private crmDetallesService: CrmDetallesService,
    private loginService: LoginService,
    private crmEstadosService: CrmEstadosService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formObservacion();
  }



  ngOnInit(): void {


    this.idUsuario = this.loginService.agenteDTO.idUsuario;

    this.crmEstadosService.listar().subscribe(data => {
      this.crmEstado = data;
    });

    this.clienteSelec();
    this.listarCasos();

  }


  clienteSelec() {

    this.clienteService.getIdClienteCambio().subscribe(data => {
      this.idClienteP = data

      const cliente = { idCliente: this.idClienteP }
      this.clienteService.clientePorId(cliente).subscribe(data => {
        this.clienteService.setClienteCambio(data)
        this.dataSourceCli = new MatTableDataSource(data);

      });

    });
  }


  listarCasos() {


    this.parametrosDTO = { idCliente: this.idClienteP }


    this.crmCasosService.casosCliente(this.parametrosDTO).subscribe(data => {
      data.forEach(caso => {
        let fechaGestionS = moment(caso.fechaGestion).format('YYYY-MM-DD')
        //    //correo
        //  let diferenciaEnDias = fechaActual.diff(fechaGestionS, 'days');
        //  console.log(diferenciaEnDias,'diff');
        //  if (diferenciaEnDias >= -2 && diferenciaEnDias <= 2) {
        //    console.log(`La fecha de gestión (${fechaGestionS}) está dentro de un rango de 2 días antes o después de la fecha actual (${fechaFormato})`);
        //  } else {
        //    console.log(`La fecha de gestión (${fechaGestionS}) no está dentro del rango de 2 días antes o después de la fecha actual (${fechaFormato})`);
        //  }
      },
      );
      this.dataSourceCasos = new MatTableDataSource(data);
      this.dataSourceCasos.paginator = this.paginator;

    });



    function sumarDiasExcluyendoFestivos(fechaActual: Date, diasASumar: number, festivos: string[]): string {
      let diasSumados = 0;

      while (diasSumados < diasASumar) {
        fechaActual.setDate(fechaActual.getDate() + 1);
        let fechaStr = fechaActual.toISOString().split('T')[0];
        if (!festivos.includes(fechaStr)) {
          diasSumados++;
        }
      }

      return fechaActual.toISOString().split('T')[0];
    }

    let fechaActual = new Date();
    let diasASumar = 2;
    let festivos: string[] = ['2024-06-18', '2024-06-20', '2024-07-20', '2024-07-21'];

    let nuevaFecha = sumarDiasExcluyendoFestivos(fechaActual, diasASumar, festivos);
    console.log(nuevaFecha);
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
    });


  }



  get observacionNoValido() {
    return this.formObs.get('observacionCaso')?.invalid && this.formObs.get('observacionCaso')?.touched
  }

  formObservacion() {

    this.formObs = this.fb.group({
      'observacionCaso': ['', [Validators.required, Validators.minLength(4)]],
      'estadoCaso': [this.idEstado, [Validators.required]]
    });
  }



  guardaObs() {

    this.parametrosDTO = {
      idCrmCaso: this.idCaso,
      idCrmEstado: this.idEstado,
      idCliente: this.idClienteP
    }
    console.log(this.parametrosDTO, 'parametro')


    let estado = new CrmEstado();
    estado.idEstado = this.idEstado;
    this.crmEstado.push(estado);

    let casos = new CrmCasos();
    casos.idCaso = this.idCaso;
    casos.crmEstado = estado;
    this.crmCasos.push(casos);


    let usu = new Usuario();
    usu.idUsuario = this.idUsuario;
    this.usuario.push(usu);


    let detalle = new CrmDetalle();
    detalle.crmCasos = casos;
    detalle.fechaDetalle = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    detalle.observacion = this.observacionCaso;
    detalle.usuario = usu;



    this.crmDetallesService.registrar(detalle).pipe(switchMap(() => {
      return this.crmDetallesService.detalleCasos(this.idCaso);
    })).subscribe(data => {
      this.dataSourceDeta = new MatTableDataSource(data);
      this.dataSourceDeta.paginator = this.paginatorDet;

    })

    this.crmCasosService.actualizaCaso(this.parametrosDTO).subscribe(() => {
    })



    setTimeout(() => {
      this.limpiarControles();
    }, 1000)
  }

  limpiarControles() {
    this.crmEstado = [];
    this.crmCasos = [];
    this.usuario = [];
    this.formObs.reset();
  }


  cancelarDet() {

    this.crmCasosService.casosCliente(this.parametrosDTO).subscribe(data => {
      this.dataSourceCasos = new MatTableDataSource(data);
      this.dataSourceCasos.paginator = this.paginator;

      this.activoEstado = false;

      this.vistadetallescasos = !this.vistadetallescasos;      
      this.limpiarControles();
      
    })   
  }

  abrirCliente(cliente?: Cliente) {
    this.dialog.open(CasoClienteComponent, {
      width: '350px',
      data: cliente
    });
  }

  abrirCasoNuevo(cliente?: Cliente) {
    this.dialog.open(CasoNuevoComponent, {
      width: '900px',
      data: cliente
    });
  }


}
