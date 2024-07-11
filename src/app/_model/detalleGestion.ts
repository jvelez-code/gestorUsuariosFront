import { EstadoGestion } from "./estadoGestion";
import { Extension } from "./extension";
import { Gestion } from "./gestion";
import { Usuario } from "./usuario";

export class DetalleGestion {

    idDetalleGestion ?: number;
    gestion !: Gestion;
    observacion?: string;
    ip?: string;
    usuarioAct?: string;
    numRealMarcado?: string;
    usuario?: Usuario;
    estadoGestion?: EstadoGestion;
    extension?: Extension;
    empresa ?: string;
    fechaGestion ?: Date; //2020-09-05T11:30:05 ISODate || moment.js
    fechaHoraSis  ?: Date;
}

let detalleGestion : DetalleGestion;