import { Campana } from "./campanas";
import { Cliente } from "./cliente";
import { Contacto } from "./contactos";
import { DetalleGestion } from "./detalleGestion";
import { DetalleGestionComercial } from "./detalleGestionComercial";
import { EstadoGestion } from "./estadoGestion";
import { Usuario } from "./usuario";

export class Gestion {

    idGestion ?: number ;
    archivo ?: number ;
    campana ?: Campana ;
    cliente ?: Cliente ;
    estadoGestion ?: EstadoGestion ;
    listaContacto ?: Contacto [];
    listaDetalleGestion ?: DetalleGestion[] ;
    listaDetalleGestionComercial ?: DetalleGestionComercial[] ;
    agente?: Usuario;
    fechaGestion ?: Date ;
    idArchivoExclusion ?: string ;
    usuarioAct ?: number
    ipAct ?: string ;
    fechaHoraSis ?: Date ;    
    flagGestionSucursal ?: boolean ;
    valorCotizacion ?: number ;
    fechaAgenda ?: Date ;    
    idGestionPadre ?: number ;
    callId ?: string ;
}

let gestion : Gestion


/*this.usuarioService.buscarAgenteCampana(ParametrosDTO).subscribe(data =>{
    this.agenteDtos=data;



  
  this.idUsuario=this.agenteDtos.idUsuario;
  this.usuario=this.agenteDtos.usuario;
  this.idCampanaE = this.agenteDtos.idCampanaE;
  this.hostIp = this.agenteDtos.hostIp;
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
  hostIp   !: any;*/
