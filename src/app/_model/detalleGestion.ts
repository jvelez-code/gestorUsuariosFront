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
    fechaGestion ?: Date; //2020-09-05T11:30:05 ISODate || moment.js
    fechaHoraSis  ?: Date;
}

let detalleGestion : DetalleGestion;