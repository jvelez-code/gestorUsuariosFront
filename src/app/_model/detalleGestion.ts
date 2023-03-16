import { EstadoGestion } from "./estadoGestion";
import { Usuario } from "./usuario";

export class DetalleGestion {

    idDetalleGestion ?: number;
    observacion?: String;
    ip?: String;
    usuarioAct?: String;
    numRealMarcado?: String;
    usuario?: Usuario;
    estadoGestion?: EstadoGestion;
    extension?: String;
    empresa ?: String;
}

let detalleGestion : DetalleGestion;