import { Campana } from "./campanas";
import { Cliente } from "./cliente";
import { Contacto } from "./contactos";
import { DetalleGestion } from "./detalleGestion";
import { EstadoGestion } from "./estadoGestion";

export class Gestion {

    idGestion ?: number ;
    archivo ?: number ;
    campana ?: Campana ;
    cliente ?: Cliente ;
    estadoGestion ?: EstadoGestion ;
    listaContacto ?: Contacto [];
    listaDetalleGestion ?: DetalleGestion[] ;
    agente ?: number ;
    fechaGestion ?: Date ;
    valorCotizacion ?: number ;
    usuarioAct ?: number
    flagGestionSucursal ?: number ;
}

let gestion : Gestion