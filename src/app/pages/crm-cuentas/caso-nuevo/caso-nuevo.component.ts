import { Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { CrmCasosService } from 'src/app/_services/crm-casos.service';
import { CrmCategoria } from 'src/app/_model/crmCategoria';
import { CrmEstado } from 'src/app/_model/crmEstado';
import { AsyncPipe } from '@angular/common';
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

@Component({
  selector: 'app-casonuevo',
  standalone: true,
  imports: [
    FormsModule,
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
    AsyncPipe  
  ],
  templateUrl: './caso-nuevo.component.html',
  styleUrl: './caso-nuevo.component.scss'
})
export class CasoNuevoComponent implements OnInit {


  formCasos!: FormGroup;
  tipoDocumento !: string;
  nroDocumento  !: string;

  idDepartSeleccion : number = 0;
  idCategoriaSeleccion : number = 0;
  idEstadoSeleccion : number = 0;
  idSubCategoriaSeleccion : number = 0;
  idTipologiaSeleccion : number = 0;
  idNivel    : number = 1;
  idCliente !: number //= 252650;
  idUsuario : number = 6575;
  nroTelefono : string = '';
  observacion : string = '';

  cliente: Cliente[] = [];
  crmCasos: CrmCasos[] = [];
  crmDetalle: CrmDetalle[] = [];
  crmTipologia: CrmTipologia[] = [];
  crmNivel: CrmNivel[] = [];
  crmEstado: CrmEstado[] = [];
  crmDepartamento: CrmDepartamento[] = [];

  crmCategoria$    !: Observable<CrmCategoria[]>;
  CrmSubCategoria$ !: Observable<CrmSubCategoria[]>;
  CrmTipologia$    !: Observable<CrmTipologia[]>;
  crmEstado$       !: Observable<CrmEstado[]>;
  crmDepartamento$ !: Observable<CrmDepartamento[]>;
  

  constructor(
    private fb : FormBuilder,
    private crmCasosService : CrmCasosService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CasoNuevoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cliente,
  )
    {   
     
    }


  ngOnInit() {

    this.crmCasosService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });
    
    this.idCliente=this.data.idCliente || 0;
    this.tipoDocumento=this.data.tipoDocumento?.tipoDoc || '';
    this.nroDocumento=this.data.nroDocumento || '';

    this.crmDepartamento$=this.crmCasosService.listarDepartamentos();
    this.crmCategoria$=this.crmCasosService.listarCategorias();
    this.crmEstado$=this.crmCasosService.listarEstados();   
  }

  aceptar(){

    if (this.idDepartSeleccion ==2){
      this.idNivel = 2
    }

    let cliente = new Cliente();
    cliente.idCliente = this.idCliente;

    let usuario = new Usuario();
    usuario.idUsuario = this.idUsuario;

    let crmTipologia = new CrmTipologia();
    crmTipologia.idTipologia = this.idTipologiaSeleccion;

    let crmNivel = new CrmNivel();
    crmNivel.idNivel = this.idNivel;

    let crmEstado = new CrmEstado();
    crmEstado.idEstado = this.idEstadoSeleccion;

    let crmDepartamento = new CrmDepartamento();
    crmDepartamento.idDepartamento = this.idDepartSeleccion;

    let crmDetalles = new CrmDetalle();
    crmDetalles.fechaDetalle = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    crmDetalles.observacion = this.observacion;
    crmDetalles.usuario = usuario;
    this.crmDetalle.push(crmDetalles);

    let crmCasos = new CrmCasos();
    crmCasos.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    crmCasos.fechaVencimiento = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    crmCasos.nroRealmarcado = this.nroTelefono;
    crmCasos.crmDepartamento = crmDepartamento;
    crmCasos.crmEstado = crmEstado;
    crmCasos.crmNivel = crmNivel;
    crmCasos.crmTipologia = crmTipologia;
    crmCasos.cliente = cliente;
    crmCasos.listaDetalle = this.crmDetalle;

    console.log(crmCasos,'111lk{ñ')

    this.crmCasosService.crearCasoNuevo(crmCasos).subscribe(data =>{
      this.crmCasosService.setMensajecambio('SE REGISTRÓ');
    })




  }


  subCategoria(subCategoria: number) {
    this.CrmSubCategoria$=this.crmCasosService.listarSubcategorias(subCategoria);
  }


  tipologia(tipologia: number) {
    this.CrmTipologia$=this.crmCasosService.listarTipologias(tipologia);
  }

  estadoBotonRegistrar() {
    return ( this.observacion === '' || this.idDepartSeleccion === 0 || this.idCategoriaSeleccion === 0 || 
             this.idEstadoSeleccion === 0 || this.idSubCategoriaSeleccion === 0 || this.idTipologiaSeleccion === 0 );
  }



  }
