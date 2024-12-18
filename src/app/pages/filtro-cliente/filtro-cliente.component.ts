import { Component, OnInit,OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterOutlet,NavigationEnd } from '@angular/router';
import { filter, interval, Observable, Subscription } from 'rxjs';
import { AskEstadoExtension } from 'src/app/_model/askEstadoExtension';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { Gestion } from 'src/app/_model/gestion';
import { Parametros } from 'src/app/_model/parametros';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { ClienteService } from 'src/app/_services/cliente.service';
import { ContactoService } from 'src/app/_services/contacto.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import * as moment from 'moment';
import { LoginService } from 'src/app/_services/login.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { CantidadGestionDTO } from 'src/app/_dto/CantidadGestionDTO ';
import { LlamadaEntranteService } from 'src/app/_services/llamada-entrante.service';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';




@Component({
    selector: 'app-filtro-cliente',
    templateUrl: './filtro-cliente.component.html',
    styleUrls: ['./filtro-cliente.component.scss'],
    standalone: true,
    imports: [RouterOutlet,
      CommonModule,
      MtxProgressModule,
      MatCardModule,
              MatCard, 
              MatCardHeader, 
              MatCardTitle, 
              MatCardContent, 
              ReactiveFormsModule, 
              MatFormField, 
              MatLabel, 
              MatInput, 
              MatCardActions, 
              MatButton, 
              MatSelect, 
              MatOption, 
              MatIcon, 
              AsyncPipe]
})



export class FiltroClienteComponent implements OnInit, OnDestroy,OnChanges {
  efectivas : any = 'Cargando...';
  noefectivas : any = 'Cargando...';
  totalgestiones :Number = 0
  stats = [
    {
      title: 'Gestiones efectivas',
      amount: `${this.efectivas}` ,
      progress: {
        value: 100,
      },
      color: '#0074E9', // Indigo
    },
    {
      title: 'Gestiones no efectivas',
      amount: this.noefectivas,
      progress: {
        value: 100,
      },
      color: '#dcc310', // Blue
    },
    {
      title: 'Total gestiones',
      amount: 'Cargando...',
      progress: {
        value: 100,
      },
      color: '#dc5410', // Green
    },
    {
      title: 'Tmo entrante',
      amount: 'Cargando...',
      progress: {
        value: 100,
      },
      color: '#3edc10', // Teal
    },
  ];


  cantidadColumns: string[] = ['usuario', 'efectiva', 'cantidad'];
  dataSourceCant !: MatTableDataSource<CantidadGestionDTO>;


  private subscripcion: Subscription = new Subscription();
  formAgente!: FormGroup;
  formBuscar!: FormGroup;
  formCliente!: FormGroup;


  tipoDocumento: string = 'CC';
  colortmo : string = '#10B981'
  nroDocumento  !: string
  idEmpresa !: number;
  idTipoCampana !: number;
  idCliente   !: any;
  cardCliente !: boolean;
  cardManual !: boolean;
  fechafin !: Date;

  valorPredeterminado !: string 
  nroExt !: any;
  colorExt !: any;
  idExt !: any;
  documentoExt !: any;
  agenteDTO!: AgenteDTO;

  parametrosDTO !:ParametrosDTO
  parametros !: Parametros;
  gestion !: Gestion;
  askEstadoExtension !: AskEstadoExtension;

  detalleGestion: DetalleGestion[] = [];

  private routerEventsSubscription: any;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  private usuarios !: string;


  tmousuario?: string;
  mostrarColor: boolean = false;
  promedio?: string;
  promedioCON: string = "00:07:30";
  promedioASI: string = "00:10:30";
  promedioELC: string = "00:12:30";
  //agenteDTO!: AgenteDTO;
  
  empresa?: string;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private loginService: LoginService,
    private tipoDocumentoService: TipoDocumentoService,
    private clienteService: ClienteService,
    private detalleGestionService: DetalleGestionService,
    private gestionService: GestionService,
    private estadoGestionService: EstadoGestionService,
    private contactoService: ContactoService,
    private askEstadoExtensionService: AskEstadoExtensionService,
    private usuarioService: UsuarioService,
    private llamadaEntranteService: LlamadaEntranteService,
    private fb: FormBuilder,

    private router: Router,
    private snackBar: MatSnackBar) { }


    ngOnChanges(changes: SimpleChanges) {
      console.log('se ejecuto desde ngOnChanges')
this.cantidadGestion();
    }
    

  ngOnInit(): void {

    this.agenteDTO=this.loginService.agenteDTO
    setTimeout(() => {
      this.cantidadGestion();
    }, 300);
    

    this.buscartmo()
    this.clienteService.getFormCambio().subscribe(data => {
      this.cardCliente = data;
    });

    this.loginService.getUsuariosCambio().subscribe((data: any) => {
      this.usuarios = data;
    });

    const askEstadoExtension = { loginAgente: this.usuarios }
    this.detalleGestionService.cantidadGestion(askEstadoExtension).subscribe(data => {
      this.dataSourceCant = new MatTableDataSource(data);
    });

    this.gestionService.getGestionCambio().subscribe(data => {
      this.dataSourceCant = new MatTableDataSource(data);
    });


    this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe(data => {
      this.colorExt = data.askEstado?.color;
      this.idExt = data.askEstado?.idEstado;
      this.nroExt = data.idExtension;
      this.valorPredeterminado = data.numeroOrigen ?? '';
      this.usuarioService.setExtensionCambio(this.nroExt);
      this.clienteService.setnumeroReal(this.valorPredeterminado);




      this.formAgente = new FormGroup({
        'agente': new FormControl(data.loginAgente),
        'estado': new FormControl(data.askEstado?.descripcion),
        'numeroReal': new FormControl(data.numeroOrigen),
        'horaInicio': new FormControl(moment(data.fechahoraInicioEstado).format('YYYY-MM-DD HH:mm:ss')),
        'horaActual': new FormControl(moment().format('YYYY-MM-DD HH:mm:ss')),

      });
    });

    this.buscarAgente();
    this.cardCliente = false;
    this.cardManual = true;


    this.formAgente = new FormGroup({
      'agente': new FormControl(''),
      'estado': new FormControl(''),
      'numeroReal': new FormControl(''),
      'horaInicio': new FormControl(''),
      'horaActual': new FormControl(''),

    });

    this.formCliente = new FormGroup({
      'cliente': new FormControl(''),
      'tipoDoc': new FormControl(''),
      'identificacion': new FormControl('')
    });

    this.formBuscar = new FormGroup({
      'nroDocumento': new FormControl('')
    });



    this.tipoDocumento$ = this.tipoDocumentoService.buscar();

    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }


  buscartmo(){
    this.llamadaEntranteService.usuarioTmo({
      loginAgente: this.usuarios,
      nroDocumento: this.agenteDTO.nroDocumento
    }).subscribe(data=>{
      this.tmousuario = data.tmoAgente
      let datePromedioC: moment.Moment = moment(this.promedioCON, "HH:mm:ss");
      let datePromedioE: moment.Moment = moment(this.promedioELC, "HH:mm:ss");
      let datePromedioA: moment.Moment = moment(this.promedioASI, "HH:mm:ss");          
      let dateTmo: moment.Moment = moment(this.tmousuario, "HH:mm:ss"); 
      this.empresa = this.agenteDTO.pseudonimo

      if(this.empresa=='CONTACT' ){this.promedio=this.promedioCON;}
      if(this.empresa=='ELECTRONICA' ){this.promedio=this.promedioELC;}
      if(this.empresa=='ASISTIDA' ){this.promedio=this.promedioASI;}

      if (this.empresa=='CONTACT' && dateTmo>datePromedioC ){ this.mostrarColor= true; }        
      if(this.empresa=='ELECTRONICA' && dateTmo>datePromedioE){ this.mostrarColor= true; }          
      if(this.empresa=='ASISTIDA' && dateTmo>datePromedioA){ this.mostrarColor= true; }          
      else {  console.log('empresa diferente')  }

    });
  }



  cantidadGestion(){
    this.detalleGestionService.cantidadGestion({ loginAgente: this.usuarios }).subscribe(data => {
      if (data) {

        if (data.length == 0) {
          this.efectivas = 0;
          this.noefectivas = 0;
          this.totalgestiones = 0;
          this.tmousuario = '00:00:00'
        } else if (data.length == 1) {
          this.efectivas = data[0].efectiva === 'efectiva' ? data[0].cantidad : 0;
          this.noefectivas = data[0].efectiva === 'noEfectiva' ? data[0].cantidad : 0;
          this.totalgestiones =parseInt(this.efectivas) + parseInt(this.noefectivas)

        } else {
          this.efectivas = data[0].cantidad;
          this.noefectivas = data[1].cantidad;
          this.totalgestiones =parseInt(this.efectivas) + parseInt(this.noefectivas)
        }
        

        this.colortmo = this.mostrarColor ? '#FF0000' : '#3edc10';
  
        this.stats = [
          {
            title: 'Gestiones efectivas',
            amount: `${this.efectivas}`,
            progress: {
              value: ((parseInt(this.efectivas)/80)*100),
            },
            color: '#0074E9',
          },
          {
            title: 'Gestiones no efectivas',
            amount: this.noefectivas,
            progress: {
              value: ((parseInt(this.noefectivas)/80)*100),
            },
            color: '#dcc310',
          },
          {
            title: 'Total gestiones',
            amount: this.totalgestiones,
            progress: {
              value: ((Number(this.totalgestiones)/80)*100),
            },
            color: '#dc5410',
          },
          {
            title: 'Tmo entrante',
            amount: this.tmousuario + ' de ' + this.promedio,
            progress: {
              value: Math.min(Math.max(Math.round((moment.duration(this.tmousuario).asSeconds() / moment.duration(this.promedio).asSeconds()) * 100),0),100),
            },
            color: this.colortmo,
          },
        ];
      } else {
        console.error('Datos recibidos no son válidos', data);
      }
    });
  }

  buscarAgente() {
    
    this.loginService.getUsuariosCambio().subscribe((data: any) => {
      this.usuarios = data;
    });

    const actualizar = interval(3000)
    this.subscripcion = actualizar.subscribe(n => {

      const askEstadoExtension = { loginAgente: this.usuarios }

      this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe(data => {
        //busca el agente en ask_estado_extension
        this.colorExt = data.askEstado?.color;
        this.idExt = data.askEstado?.idEstado;
        this.documentoExt = data.nroDocumento;
        this.valorPredeterminado = data.numeroOrigen ?? '';
        this.clienteService.setnumeroReal(this.valorPredeterminado);

        this.formAgente = new FormGroup({
          'agente': new FormControl(data.loginAgente),
          'estado': new FormControl(data.askEstado?.descripcion),
          'numeroReal': new FormControl(data.numeroOrigen),
          'horaInicio': new FormControl(moment(data.fechahoraInicioEstado).format('YYYY-MM-DD HH:mm:ss')),
          'horaActual': new FormControl(moment().format('YYYY-MM-DD HH:mm:ss')),

        });
        if (this.idExt === 3) {
          const parametrosDTO = { nroDocumento: this.documentoExt }
          this.clienteService.asteriskCliente(parametrosDTO).subscribe(data => {

            if (data === null) 
           {
                this.llamadaEntranteService.LlamadaEntrante(parametrosDTO).subscribe((data: any) => {

                  this.clienteService.setcallid(data.idAsterisk);

                  this.formCliente = new FormGroup({
                    'cliente': new FormControl(''),
                    'tipoDoc': new FormControl(data.tipoDoc),
                    'identificacion': new FormControl(data.numeroDocumento)
                  });
                });

            } else {
              this.formCliente = new FormGroup({
                'cliente': new FormControl(data.razonSocial),
                'tipoDoc': new FormControl(data.tipoDocumento.tipoDoc),
                'identificacion': new FormControl(data.nroDocumento)
              });
            }

          });
        }
        else if (this.idExt !== 3) {
          this.formCliente = new FormGroup({
            'cliente': new FormControl(''),
            'tipoDoc': new FormControl(''),
            'identificacion': new FormControl('')
          });

        }
      });

    });




  }

  buscarAuto() {

    const parametrosDTO = { tipoDoc: this.formCliente.value['tipoDoc'], nroDocumento: this.formCliente.value['identificacion'] }

    this.clienteService.filtroCliente(parametrosDTO).subscribe(data => {
      this.idCliente = data[0].idCliente;
      this.clienteService.setIdClienteCambio(this.idCliente);

      this.router.navigate(['gestionEntrante']);


    });


  }


  buscarManual() {
    this.cardCliente = true;
    this.cardManual = false;
    this.clienteService.setDocumentoNuevo(this.formCliente.value['identificacion'])
    
    this.formBuscar = new FormGroup({
      'nroDocumento': new FormControl(this.formCliente.value['identificacion'])
    });


  }




  buscarCliente() {
    const parametrosDTO = { tipoDoc: this.tipoDocumento, nroDocumento: this.formBuscar.value['nroDocumento'] }

    this.clienteService.filtroCliente(parametrosDTO).subscribe(data => {
      //VALIDA SI EL ARREGLO ESTA VACIO
      if (Array.isArray(data) && data.length > 0) {
        this.idCliente = data[0].idCliente;
        this.clienteService.setIdClienteCambio(this.idCliente);

        this.router.navigate(['gestionEntrante']);
      } else {
        this.clienteService.setDocumentoNuevo(this.formBuscar.value['nroDocumento'])
        this.router.navigate(['clientes']);
      }
    });
  }

  gestionEntrante() {
    this.router.navigate(['gestionEntrante']);
  }



  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

}
