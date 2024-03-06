import { EstadoGestion } from "./estadoGestion";
import { Extension } from "./extension";
import { Gestion } from "./gestion";
import { Usuario } from "./usuario";

export class DetalleGestion {

    idDetalleGestion ?: number;
    gestion ?: Gestion;
    observacion?: String;
    ip?: String;
    usuarioAct?: String;
    numRealMarcado?: String;
    usuario?: Usuario;
    estadoGestion?: EstadoGestion;
    extension?: Extension;
    empresa ?: String;
    fechaGestion ?: Date; //2020-09-05T11:30:05 ISODate || moment.js
    fechaHoraSis  ?: Date;
}

let detalleGestion : DetalleGestion;