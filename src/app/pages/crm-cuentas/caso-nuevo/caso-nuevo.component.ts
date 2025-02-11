import { Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, switchMap } from 'rxjs';
import { CrmCasosService } from 'src/app/_services/crm-casos.service';
import { CrmCategoria } from 'src/app/_model/crmCategoria';
import { CrmEstado } from 'src/app/_model/crmEstado';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { CrmSubCategoria } from 'src/app/_model/crmSubCategoria';
import { CrmTipologia } from 'src/app/_model/crmTipologia';
import { CrmDepartamento } from 'src/app/_model/crmDepartamento';
import { Cliente } from 'src/app/_model/cliente';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrmNivel } from 'src/app/_model/crmNivel';
import { CrmCasos } from 'src/app/_model/crmCasos';
import * as moment from 'moment';
import { CrmDetalle } from 'src/app/_model/crmDetalle';
import { Usuario } from 'src/app/_model/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/_services/login.service';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { CrmOrigen } from 'src/app/_model/crmOrigen';
import { CrmProceso } from 'src/app/_model/crmProceso';
import { CrmFuente } from 'src/app/_model/crmFuente';
import { CrmCategoriaService } from 'src/app/_services/crm-categoria.service';
import { Festivos } from 'src/app/_model/festivo';
import { FestivosService } from 'src/app/_services/festivos.service';

@Component({
    selector: 'app-casonuevo',
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatToolbar,
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './caso-nuevo.component.html',
    styleUrl: './caso-nuevo.component.scss'
})
export class CasoNuevoComponent implements OnInit {


  formCasos!: FormGroup;
  parametrosDTO !: ParametrosDTO;
  tipoDocumento !: string;
  nroDocumento  !: string;
  diasVencimiento !: number;
  fechaActual = new Date();
  nuevaFecha !:string;

  idDepartSeleccion : number = 0;
  idCategoriaSeleccion : number = 0;
  idSubCategoriaSeleccion : number = 0;
  idTipologiaSeleccion : number = 0;
  idFuenteSeleccion : number = 0;
  idOrigenSeleccion : number = 0;
  idProcesoSeleccion : number = 0;
    
  idNivel    : number = 1;
  idCliente !: number //= 252650;
  idUsuario : any;

  cliente: Cliente[] = [];
  crmCasos: CrmCasos[] = [];
  crmDetalle: CrmDetalle[] = [];
  crmTipologia: CrmTipologia[] = [];
  crmNivel: CrmNivel[] = [];
  crmEstado: CrmEstado[] = [];
  crmDepartamento: CrmDepartamento[] = [];
  crmFuente: CrmFuente[] = [];
  crmOrigen: CrmOrigen[] = [];
  crmProceso: CrmProceso[] = [];
  festivo !: Festivos[];

  crmCategoria$    !: Observable<CrmCategoria[]>;
  CrmSubCategoria$ !: Observable<CrmSubCategoria[]>;
  CrmTipologia$    !: Observable<CrmTipologia[]>;
  crmEstado$       !: Observable<CrmEstado[]>;
  crmDepartamento$ !: Observable<CrmDepartamento[]>;
  crmFuente$       !: Observable<CrmFuente[]>;
  crmOrigen$       !: Observable<CrmOrigen[]>;
  crmProceso$      !: Observable<CrmProceso[]>;
  

  constructor(
    private fb : FormBuilder,
    private crmCasosService : CrmCasosService,
    private crmCategoriaService: CrmCategoriaService,
    private loginService: LoginService,
    private festivosService: FestivosService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CasoNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cliente,
  )
    {   
      this.crearFormulario();
     
    }

 
  ngOnInit() {
    this.idUsuario = this.loginService.agenteDTO.idUsuario;

    this.crmCasosService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });
    
    this.idCliente=this.data.idCliente || 0;
    this.tipoDocumento=this.data.tipoDocumento?.tipoDoc || '';
    this.nroDocumento=this.data.nroDocumento || '';

    this.crmDepartamento$=this.crmCasosService.listarDepartamentos();
    this.crmCategoria$=this.crmCategoriaService.listar();
    //this.crmEstado$=this.crmCasosService.listarEstados();
    this.crmFuente$ =this.crmCasosService.listarFuentes();
    this.crmOrigen$ =this.crmCasosService.listarOrigenes();
    this.crmProceso$ =this.crmCasosService.listarProcesos();

    this.festivo= this.festivosService.festivos;
  }

  subCategoria(subCategoria: number) {
    this.CrmSubCategoria$=this.crmCasosService.listarSubcategorias(subCategoria);

    this.crmCategoriaService.listarPorId(subCategoria).subscribe(data =>{
      this.diasVencimiento = data.diasVencimiento || 0;
    });
  }


  tipologia(tipologia: number) {
    this.CrmTipologia$=this.crmCasosService.listarTipologias(tipologia);
  }


  //CALCULA LA FECHA DE VENCIMIENTO
  convertirFestivosAFechas(festivos: Festivos[]): string[] {
    return festivos
        .map(f => f.fecha)
        .filter(f => f !== undefined) as string[]; 
  }
 
  sumarDiasExcluyendoFestivos(fechaActual: Date, diasASumar: number, festivos: string[]): string {
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




  //GUARDAR CASO

  guardar(){
    
    if( this.formCasos.invalid){
      return Object.values(this.formCasos.controls).forEach( control =>{
        control.markAllAsTouched();
      });
    }

    if (this.idDepartSeleccion ==2){
      this.idNivel = 2
    }
   
    let festivos: string[] = this.convertirFestivosAFechas(this.festivo);

   this.nuevaFecha = this.sumarDiasExcluyendoFestivos(this.fechaActual, this.diasVencimiento, festivos);    
  
    let cliente = new Cliente();
    cliente.idCliente = this.idCliente;

    let usuario = new Usuario();
    usuario.idUsuario = this.idUsuario;

    let crmTipologia = new CrmTipologia();
    crmTipologia.idTipologia = this.idTipologiaSeleccion;

    let crmEstado = new CrmEstado();
    crmEstado.idEstado = this.formCasos.value['idEstado'];

    let crmNivel = new CrmNivel();
    crmNivel.idNivel = this.idNivel;

    let crmOrigen = new CrmOrigen();
    crmOrigen.idOrigen  = this.idOrigenSeleccion;

    let crmProceso = new CrmProceso();
    crmProceso.idProceso = this.idProcesoSeleccion;

    let crmFuente = new CrmFuente();
    crmFuente.idFuente = this.idFuenteSeleccion;       

    let crmDepartamento = new CrmDepartamento();
    crmDepartamento.idDepartamento = this.idDepartSeleccion;

    let crmDetalles = new CrmDetalle();
    crmDetalles.fechaDetalle = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
    crmDetalles.observacion = this.formCasos.value['observacion'];
    crmDetalles.usuario = usuario;
    this.crmDetalle.push(crmDetalles);

    let crmCasos = new CrmCasos();
    crmCasos.fechaCaso = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
    crmCasos.fechaVencimiento = moment(this.nuevaFecha).format('YYYY-MM-DD') //new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    crmCasos.fechaCierre = '';
    crmCasos.nroRealmarcado = this.formCasos.value['nroTelefono'],
    crmCasos.crmDepartamento = crmDepartamento;
    crmCasos.crmEstado = crmEstado;
    crmCasos.crmNivel = crmNivel;
    crmCasos.crmOrigen = crmOrigen;
    crmCasos.crmProceso = crmProceso;

    crmCasos.crmTipologia = crmTipologia;
    crmCasos.cliente = cliente;
    crmCasos.listaDetalle = this.crmDetalle;
    if( this.formCasos.value['observacion'] ==2){
      crmCasos.fechaCierre = moment(new Date).format('YYYY-MM-DD HH:mm:ss')
    }

    this.parametrosDTO = { idCliente: this.idCliente }
    this.crmCasosService.crearCasoNuevo(crmCasos).pipe(switchMap(()=>{
      return   this.crmCasosService.casosCliente(this.parametrosDTO);
    })).subscribe(data =>{
      this.crmCasosService.setCrmCasosCambio(data);
    });


    this.crmCasosService.setMensajecambio('SE REGISTRÓ');


    this.cerrar();

  }

 

  crearFormulario(){

    this.formCasos = this.fb.group({
      idEstado: ['2',[Validators.required]],
      nroTelefono:['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      observacion:['',[Validators.required, Validators.minLength(4)]],
    });

  }

  get telefonoNoValido() {
    return this.formCasos.get('nroTelefono')?.invalid && this.formCasos.get('nroTelefono')?.touched
  }
  get observacionNoValido() {
    return this.formCasos.get('observacion')?.invalid && this.formCasos.get('observacion')?.touched
  }






 

  estadoBotonRegistrar() {
    return ( this.idDepartSeleccion === 0 || this.idCategoriaSeleccion === 0 || 
             this.idSubCategoriaSeleccion === 0 || this.idTipologiaSeleccion === 0 );
  }

  cerrar() {
    this.dialogRef.close();
  }


  }
