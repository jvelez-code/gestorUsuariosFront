import { CicloVida } from "./cicloVida";
import { Gestion } from "./gestion";
import { Motivo } from "./motivoComercial";
import { Usuario } from "./usuario";

export class DetalleGestionComercial {

    idDetalleGestionComercial?: number;
    gestion?: Gestion;
    detalleGestion?: String;
    fechaGestion?: Date; //2020-09-05T11:30:05 ISODate || moment.js
    motivo?: Motivo;
    gestionRealizada?: String;
    nroGestionRealizada?: String;
    compromisos?: String;
    usuario?: Usuario;
    regProyectados?: String; 
    regObtenidos ?: String;
    cicloVida?: CicloVida;
    activarMod?: String; 
    nomArchivo ?: String;
}

let detalleGestion : DetalleGestionComercial;