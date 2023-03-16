import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { Contacto } from 'src/app/_model/contactos';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { EstadoGestion } from 'src/app/_model/estadoGestion';
import { Gestion } from 'src/app/_model/gestion';
import { Parametros } from 'src/app/_model/parametros';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { ClienteService } from 'src/app/_services/cliente.service';
import { ContactoService } from 'src/app/_services/contacto.service';
import { DetalleGestionService } from 'src/app/_services/detalle-gestion.service';
import { EstadoGestionService } from 'src/app/_services/estado-gestion.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';


@Component({
  selector: 'app-entrante',
  templateUrl: './entrante.component.html',
  styleUrls: ['./entrante.component.css']
})
export class EntranteComponent implements OnInit {

  displayedColumns: string[] = ['razonSocial','tipoDocumento.tipoDoc','nroDocumento','divipola.nombre',
  'divipola.idZonapadre.nombre','correo','telefonoCelular','telefonoFijo','acciones'];
  dataSourceCli !: MatTableDataSource<Cliente>; 

  detalleGestionColumns: string[] = ['observacion','fechaHoraSis','numRealMarcado'];
  dataSource !: MatTableDataSource<Cliente>;


  tipoDocumento !: string;
  nroDocumento  !: string;
  idEmpresa !: number;
  idTipoCampana !: number;
  idClienteP   !: any;
  idContactoP   !: number;
  gestionPadre !: number;
  gestionHijo !: number;
  panelOpenState = false;
  tipoGestionP !: number;
  tipoGestionH !: number;

  parametros !: Parametros;
  gestion !: Gestion;
  cliente !: Cliente;

  detalleGestion: DetalleGestion [] = [];

  contacto: Contacto [] = [];
  nombreC !:String;
  correoC !:String;
  telPrincipalC !:String;
  telSecundarioC !:String;
  telCelularC !:String;




  constructor( 
    private TipoDocumentoService : TipoDocumentoService,
    private clienteService : ClienteService,
    private detalleGestionService : DetalleGestionService,
    private gestionService :GestionService ,
    private estadoGestionService :EstadoGestionService,
    private contactoService :ContactoService,
    private router: Router,
    private snackBar: MatSnackBar) { }



  form!: FormGroup;
  formGuardar!: FormGroup;
  formContacto!: FormGroup;
  id!: number;
  edicion!: boolean;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  tipoGestion$ !: Observable<EstadoGestion[]>;
  subTipoGestion$ !: Observable<EstadoGestion[]>;
  gestion$ !: Observable<EstadoGestion[]>;


  ngOnInit(): void {

    this.clienteService.getClienteCambio().subscribe(data =>{
      this.idClienteP=data.idCliente;
      console.log('Pruebas cliente1',data.idCliente);
      console.log('Pruebas cliente3',this.idClienteP);
       //this.idClienteP= 252650;
    this.idContactoP= 13452797;
    this.clienteSelec();
    this.gestionHistorico();
    this.contactoUltimo();
    });

    

    this.form = new FormGroup({
      'id': new FormControl(0),
      'razonSocial': new FormControl(''),

    });

    this.formGuardar = new FormGroup({
      'observacionD': new FormControl('')
    });

    this.formContacto = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'telPrincipal': new FormControl(''),
      'telSecundario': new FormControl(''),
      'telCelular': new FormControl(''),
    });

  }

  
buscar(){
 this.clienteSelec();
 this.gestionHistorico();
 this.contactoUltimo();

}
  

  clienteSelec(){

    this.tipoGestionP = 0
    this.tipoGestionH = 0
    const parametros= { tipoDoc:this.tipoDocumento, nroDoc:this.nroDocumento, prueba:this.nroDocumento }
    
    // this.clienteService.filtroCliente(parametros).subscribe( data =>{
    //   console.log('CLiente: ', data)
    //     this.dataSourceCli= new MatTableDataSource(data);
    // });

    const cliente= { idCliente:this.idClienteP }

    this.clienteService.clientePorId( cliente ).subscribe(data =>{
        console.log('CLiente: ', data)
        this.dataSourceCli= new MatTableDataSource(data);

    });

    

  }

  gestionHistorico(){

    console.log('tipo',this.tipoDocumento);
    console.log('doc',this.nroDocumento);
    this.idEmpresa= 1;
    this.idTipoCampana= 3;
    //this.tipoGestionP= 283755

    const parametros= { nroDoc:this.nroDocumento, idEmpresa:this.idEmpresa, 
                        idTipoCampana:this.idTipoCampana, idEstadoPadre:this.tipoGestionP,
                        nroCliente:this.idClienteP }
    
    // this.detalleGestionService.detalleHistoricoS(parametros).subscribe( data =>{
    //     console.log('Prueba Gestiones',data)
    //     this.dataSource= new MatTableDataSource(data);
    //    // console.log('tipo2',data.idCliente);
    // });





    //TIPIFICACIÓN
   this.tipoGestion$=this.estadoGestionService.estadoGestionPadre(parametros);
   
   

    /*this.estadoGestionService.estadoGestionPadre(parametros).subscribe(data => {
      console.log(data);
    });*/

  }

  subtipoGestion(tipoGestionP:number){

    console.log(tipoGestionP)

    const parametros= {  idEstadoPadre:this.tipoGestionP , idTipoCampana:this.idTipoCampana, }


    this.subTipoGestion$=this.estadoGestionService.estadoGestionHijo(parametros);
  }


//LISTA DE CONTACTO

  contactoUltimo(){
    const parametros= { idCliente: this.idClienteP }

    this.contactoService.filtroContacto(parametros).subscribe(data =>{
     this.formContacto = new FormGroup({
      'nombre': new FormControl(data.nombre),
      'correo': new FormControl(data.correoElectronico),
      'telPrincipal': new FormControl(data.numeroContacto),
      'telSecundario': new FormControl(data.telefonoDirecto),
      'telCelular': new FormControl(data.telefonoCelular)
    });
    });
  }

  guardarGestion(){

    let cliente = new Cliente();
    cliente.idCliente = this.idClienteP;
    
    
    let det = new DetalleGestion();
    det.observacion = this.formGuardar.value['observacionD'];
    this.detalleGestion.push(det);

    let cont = new Contacto();
    cont.nombre = this.formContacto.value['nombre'];
    cont.correoElectronico = this.formContacto.value['correo'];
    cont.numeroContacto = this.formContacto.value['telPrincipal'];
    cont.telefonoDirecto = this.formContacto.value['telSecundario'];
    cont.telefonoCelular = this.formContacto.value['telCelular'];
    cont.cliente = cliente;
    this.contacto.push(cont);



    let gestion = new Gestion();
    gestion.cliente = cliente;
    gestion.listaDetalleGestion = this.detalleGestion;
    gestion.listaContacto = this.contacto;
    
    this.gestionService.guardarGestionS(gestion).subscribe( ()=> {
      console.log("guardar Gestiorn")
    });

    this.router.navigate(['filtroCliente']);

  }


 




}
