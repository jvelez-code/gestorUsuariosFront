import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import * as moment from 'moment';
import { Observable, switchMap } from 'rxjs';
import { LlamadaEntranteDTO } from 'src/app/_dto/LlamadaEntranteDTO';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { FiltroDetalleGestionDTO } from 'src/app/_dto/filtroDetalleGestionDTO';
import { Campana } from 'src/app/_model/campanas';
import { Cliente } from 'src/app/_model/cliente';
import { Contacto } from 'src/app/_model/contactos';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { Divipola } from 'src/app/_model/divipola';
import { EstadoGestion } from 'src/app/_model/estadoGestion';
import { Extension } from 'src/app/_model/extension';
import { Gestion } from 'src/app/_model/gestion';
import { Usuario } from 'src/app/_model/usuario';
import { AskEstadoExtensionService } from 'src/app/_services/ask-estado-extension.service';
import { ClienteService } from 'src/app/_services/cliente.service';
import { ContactoService } from 'src/app/_services/contacto.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { LoginService } from 'src/app/_services/login.service';
import { SecretariaVirtualService } from 'src/app/_services/secretaria-virtual.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { ValidadoresService } from 'src/app/_services/validadores.service';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardContent } from '@angular/material/card';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { DivipolaDTO } from 'src/app/_dto/divipolaDTO ';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';
import { DivipolaService } from 'src/app/_services/divipola.service';

@Component({
    selector: 'app-secretaria-virtual',
    templateUrl: './secretaria-virtual.component.html',
    styleUrls: ['./secretaria-virtual.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatButton, MatCardContent, 
      MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, 
      MatRowDef, MatRow, MatPaginator, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, NgFor, MatOption, 
      MatIcon, MatDivider, AsyncPipe, MatSnackBarModule]
})
export class SecretariaVirtualComponent implements OnInit {


  parametrosDTO!: ParametrosDTO;
  llamadaEntranteDTO!: LlamadaEntranteDTO

  formSecretaria!: FormGroup;
  formCliente!: FormGroup;
  formContacto!: FormGroup;
  formGuardar!: FormGroup;

  nroDocumento!: string ;
  idCliente !: number | undefined ; 
  numeroReal !: string;
  cardVisible : boolean = false
  cardCliente : boolean = true;
  fechaHora !: string;
  numeroDevolucion !: string;
  divipola : number = 184;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  divipola$ !: Observable<DivipolaDTO[]>;
  tipoDocumento !: string ;






  tipoGestionP !: number;
  tipoGestionH !: any;
  idEmpresa   !: any;
  idEstadoP   !: any;
  idEstadoH   !: any;
  idUsuario   !: any;
  usuario     !: any;
  idCampanaE  !: any;
  extension   !: any;
  idZona      !: any;
  hostIp      !: any;
  numRealMarcado !: any;
  callid      !: string;
  tipoLlamada !: number;
  tipoGestion$ !: Observable<EstadoGestion[]>;
  tiposGestion !: EstadoGestion[];
  subTipoGestion$ !: Observable<EstadoGestion[]>;
  detalleGestion: DetalleGestion[] = [];
  contacto: Contacto[] = [];


  clienteColumns = ['razonSocial','tipoDocumento.tipoDoc','nroDocumento','divipola.nombre',
                    'divipola.idZonapadre.nombre','correo','telefonoCelular','telefonoFijo'];
  dataSourceCli !: MatTableDataSource<Cliente>; 

  detalleGestionColumns: string[] = ['fecha','usuario','campana','tipo','subtipo','observacion','numero'];
  dataSourceHisto !: MatTableDataSource<FiltroDetalleGestionDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


 constructor ( 
  private secretariaVirtualService: SecretariaVirtualService,
  private clienteService: ClienteService,
  private detalleGestionService: DetalleGestionService,
  private validadoresService: ValidadoresService,
  private contactoService : ContactoService,
  private estadoGestionService:EstadoGestionService,
  private gestionService: GestionService,
  private askEstadoExtensionService: AskEstadoExtensionService,
  private loginService: LoginService,
  private usuarioService: UsuarioService,
  private tipoDocumentoService : TipoDocumentoService,
  private divipolaService : DivipolaService,
  private snackBar: MatSnackBar,
  private fb: FormBuilder ) 
 { 
  this.crearFormulario();
 }

   
  ngOnInit(): void {

    this.loginService.getUsuariosCambio().subscribe((data: any) => {
      this.usuario = data;
    });

    this.parametrosDTO = { loginAgente: this.usuario }
    this.usuarioService.buscarAgenteCampana(this.parametrosDTO).subscribe(data => {
      this.idCampanaE = data.idCampanaE;
      this.idUsuario = data.idUsuario;
      this.idEmpresa = data.idEmpresa;
      this.hostIp = data.hostIp;
     
    });



    const askEstadoExtension = { loginAgente: this.usuario }

    this.askEstadoExtensionService.buscarxAgentes(askEstadoExtension).subscribe(data => {
      this.extension = data.idExtension;
      this.numRealMarcado = data.numeroOrigen;
    });

    this.tipoDocumento$=this.tipoDocumentoService.buscar();
    this.divipola$= this.divipolaService.buscar();


  

    this.clienteService.getcallid().subscribe(data => {
      this.callid = data;
    });

    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    })

    this.secretariaVirtualService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    })

  }

   

  buscarSecreVirt() {

    this.llamadaEntranteDTO = { empresa: 'CONTACT', idAgente: this.idUsuario}
    this.secretariaVirtualService.llamadaSecretaria(this.llamadaEntranteDTO).subscribe(data => {

      if(!data){
        this.secretariaVirtualService.setMensajecambio('NO HAY DEVOLUCIONES');
        return;
      }
      console.log('hola mundo')
      this.fechaHora =  moment(data.fechaHora).format('YYYY-MM-DD HH:mm:ss');
      this.numeroDevolucion = data.numeroDevolucion;
      this.tipoDocumento = data.tipoDocumento.tipoDoc || '';
      this.nroDocumento = data.numeroDocumento || '';


      this.parametrosDTO = { tipoDoc: this.tipoDocumento, nroDocumento: this.nroDocumento };
      this.clienteService.filtroCliente(this.parametrosDTO).subscribe(data =>{
        
        if(data && data.length > 0) {
          this.cardVisible=!this.cardVisible; 
          this.dataSourceCli= new MatTableDataSource(data);
          this.idCliente= data[0].idCliente;
          this.idZona = data[0].divipola?.idZona;
          this.gestionHistorico();
                 
        } else  {
          this.cardCliente=!this.cardCliente;
        }
      
      })
    });    
  }

    




  gestionHistorico() { 

    this.tipoLlamada = 0;

   this.parametrosDTO= { idCliente: this.idCliente, idEmpresa: this.idEmpresa }

    //HISTORICO
    this.detalleGestionService.detalleHistorico(this.parametrosDTO).subscribe(data =>{
      this.dataSourceHisto= new MatTableDataSource(data);
      this.dataSourceHisto.paginator = this.paginator;
    });

    
    //CONTACTO
    this.contactoUltimo();

     //TIPIFICACIÓN
     this.tipoGestion$ = this.estadoGestionService.estadoSecretaria(this.parametrosDTO);
    
    }



  crearFormulario(){
    this.formCliente = this.fb.group({
      'rsocial': ['', [Validators.required,Validators.minLength(3),Validators.maxLength(64)]],
      'direccion': ['',[Validators.required,Validators.minLength(3),Validators.maxLength(32)]],
      'telefono': ['',[Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'celular': ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'correo': ['',[ Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      'empleados': ['',[Validators.required,Validators.minLength(1),Validators.maxLength(4),Validators.pattern('^[0-9]+$')]]

    });
  
    this.clienteService.getnumeroReal().subscribe(data=>{
      this.numeroReal=data;
    })


    this.formContacto = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'telPrincipal': new FormControl(''),
      'telSecundario':  new FormControl(''),
      'telCelular': new FormControl(''),
     });


    this.formGuardar = this.fb.group({
      'observacionD': ['', [Validators.required,Validators.minLength(4)]],
      'numeroreal': [this.numeroReal,[Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      'tipificacioP': ['', [Validators.required, this.validadoresService.validatetipo ]],
      'tipificacioH': ['', [Validators.required, this.validadoresService.validatetipo ]]
      });  
  }



  get rsocialNoValido() {
    return this.formCliente.get('rsocial')?.invalid && this.formCliente.get('rsocial')?.touched
  }
  get direccionNoValido() {
    return this.formCliente.get('direccion')?.invalid && this.formCliente.get('direccion')?.touched
  }
  get telefonoNoValido() {
    return this.formCliente.get('telefono')?.invalid && this.formCliente.get('telefono')?.touched
  }
  get celularNoValido() {
    return this.formCliente.get('celular')?.invalid && this.formCliente.get('celular')?.touched
  }
  get correoNoValidoCli() {
    return this.formCliente.get('correo')?.invalid && this.formCliente.get('correo')?.touched
  }
  get empleadosNoValido() {
    return this.formCliente.get('empleados')?.invalid && this.formCliente.get('empleados')?.touched
  }



  validarNumeros(event: KeyboardEvent) {
    const input = event.key;
    const regex = /[0-9]/;
    if (!regex.test(input)) {
      event.preventDefault();
    }
  }


  //CREAR CLIENTE
  guardarCliente(){

      let tipo = new TipoDocumento
      tipo.tipoDoc = this.tipoDocumento;
  
      let divi = new Divipola
      divi.idZona = this.divipola;
  
      let cli = new Cliente();
      cli.tipoDocumento = tipo;
      cli.nroDocumento = this.nroDocumento;
      cli.divipola = divi;
      cli.razonSocial = this.formCliente.value['rsocial'];
      cli.direccion = this.formCliente.value['direccion'];
      cli.telefonoFijo = this.formCliente.value['telefono'];
      cli.telefonoCelular = this.formCliente.value['celular'];
      cli.correo = this.formCliente.value['correo'];
      cli.cantidadEmpleados = this.formCliente.value['empleados'];
      cli.usuario = this.usuario;
      cli.ley1581 = false;
      cli.fechaHoraSistema = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
      cli.ip = this.loginService.agenteDTO.hostIp;
  
      
  // Primero guardamos el cliente
  this.clienteService.guardarCliente(cli).pipe(
    switchMap(() => {
      this.clienteService.setMensajecambio('SE REGISTRÓ');
      this.cardCliente = true;
      this.parametrosDTO = { tipoDoc: this.tipoDocumento, nroDocumento: this.nroDocumento };
      return this.clienteService.filtroCliente(this.parametrosDTO);
    })
  ).subscribe(data => {
    this.dataSourceCli = new MatTableDataSource(data);
    this.idCliente = data[0].idCliente;
    this.idZona = data[0].divipola?.idZona;
    this.gestionHistorico();
  });
    }



//CONTACTO
contactoUltimo(){
  const parametros= { idCliente: this.idCliente }

  this.contactoService.filtroContacto(parametros).subscribe(data =>{
    this.formContacto = this.fb.group({
    'nombre': [data.nombre, [Validators.required,Validators.minLength(4),Validators.maxLength(16)]],
    'correo': [data.correoElectronico,[ Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
    'telPrincipal': [data.numeroContacto,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
    'telSecundario': [data.telefonoDirecto,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
    'telCelular': [data.telefonoCelular,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
   });
  });
}


get nombreNoValido() {
  return this.formContacto.get('nombre')?.invalid && this.formContacto.get('nombre')?.touched
}
get correoNoValido() {
  return this.formContacto.get('correo')?.invalid && this.formContacto.get('correo')?.touched
}
get telPrincipalNoValido() {
  return this.formContacto.get('telPrincipal')?.invalid && this.formContacto.get('telPrincipal')?.touched
}
get telSecundarioNoValido() {
  return this.formContacto.get('telSecundario')?.invalid && this.formContacto.get('telSecundario')?.touched
}
get telCelularNoValido() {
  return this.formContacto.get('telCelular')?.invalid && this.formContacto.get('telCelular')?.touched
}
get observacionDNoValido() {
  return this.formGuardar.get('observacionD')?.invalid && this.formGuardar.get('observacionD')?.touched
}
get numerorealNoValido() {
  return this.formGuardar.get('numeroreal')?.invalid && this.formGuardar.get('numeroreal')?.touched
}




tipoGestion(tipoGestionP: number) {
  this.idEstadoP = tipoGestionP;
  this.tipoGestionH = null;
  this.idEstadoH = this.tipoGestionH;
  const parametros = { idEstadoPadre: this.tipoGestionP, tipoLlamada: this.tipoLlamada, }

  this.subTipoGestion$ = this.estadoGestionService.estadoGestionHijo(parametros);

  this.estadoGestionService.estadoGestionHijo(parametros).subscribe(data => {

    if (Array.isArray(data) && data.length > 0) {
      console.log(data);
    } 
    else {
      this.tipoGestionH = 0;
      this.idEstadoH = 0;
      this.idEstadoH = this.tipoGestionP;
    }
  });

  if (this.idEstadoH == 0) {
    this.idEstadoH = this.tipoGestionP;
  }
}


subtipoGestion(tipoGestionH: number) {
  this.idEstadoH = tipoGestionH;
}

guardarGestion() {

  let campana = new Campana
  campana.idCampana = this.idCampanaE

  let ext = new Extension
  ext.extension = this.extension;


  let usuario = new Usuario
  usuario.idUsuario = this.idUsuario


  let cliente = new Cliente();
  cliente.idCliente = this.idCliente;

  let divi = new Divipola();
  divi.idZona = this.idZona;

  let estadoGestion = new EstadoGestion();
  estadoGestion.idEstadoGestion = this.idEstadoP;

  let estadoGestionH = new EstadoGestion();
  estadoGestionH.idEstadoGestion = this.idEstadoH;


  let det = new DetalleGestion();
  det.observacion = this.formGuardar.value['observacionD'];
  det.numRealMarcado = this.formGuardar.value['numeroreal'];
  det.usuario = usuario;
  det.estadoGestion = estadoGestionH;
  det.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  det.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  det.ip = this.hostIp;
  det.usuarioAct = this.usuario;
  det.extension = ext;
  this.detalleGestion.push(det);

  let cont = new Contacto();
  cont.nombre = this.formContacto.value['nombre'];
  cont.correoElectronico = this.formContacto.value['correo'];
  cont.numeroContacto = this.formContacto.value['telPrincipal'];
  cont.telefonoDirecto = this.formContacto.value['telSecundario'];
  cont.telefonoCelular = this.formContacto.value['telCelular'];
  cont.cliente = cliente;
  cont.usuario = usuario;
  cont.divipola = divi;
  this.contacto.push(cont);


  let gestion = new Gestion();
  gestion.cliente = cliente;
  gestion.agente = usuario;
  gestion.listaDetalleGestion = this.detalleGestion;
  gestion.listaContacto = this.contacto;
  gestion.estadoGestion = estadoGestion;
  gestion.campana = campana;
  gestion.usuarioAct = this.usuario;
  gestion.ipAct = this.hostIp
  gestion.flagGestionSucursal = false
  gestion.callId = this.callid

  gestion.fechaHoraSis = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
  gestion.fechaGestion = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));


  this.gestionService.guardarGestionS(gestion).subscribe(() => {
    this.secretariaVirtualService.setMensajecambio('SE REGISTRÓ');

    setTimeout(() => {
      this.limpiarControles();
       }, 2000);
  });

  this.cardVisible=!this.cardVisible;


}


cancelarGestion() {
  this.secretariaVirtualService.setMensajecambio('SE CANCELO');

  setTimeout(() => {
    this.limpiarControles();
  }, 2000);

  this.cardVisible=!this.cardVisible;

}


limpiarControles() {
  this.detalleGestion = [];
  this.contacto = [];
  this.idEstadoP = null;
  this.tipoDocumento = '';
  this.nroDocumento = '';
  this.fechaHora = '';
  this.numeroDevolucion = '';

}

cancelarCliente() {

  this.formCliente.reset({
    'rsocial': '',
    'direccion': '',
    'telefono': '',
    'celular': '',
    'empleados': ''
  });   

  
  this.secretariaVirtualService.setMensajecambio('SE CANCELO');

  setTimeout(() => {
    this.limpiarControles();
  }, 2000);

  this.cardCliente =!this.cardCliente;

}
  
}
