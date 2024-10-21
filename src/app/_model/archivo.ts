import { Campana } from "./campana";

export class Archivo {
    idArchivo?: number;
    campana?: Campana;
    usuarioCargue?: string;
    nombreArchivo?: string;
    cantidadRegistros?: number;
    fechaHoraCargue?: string;
    registrosExitosos?: number;
    registrosError?: number;
    operacion?: string;
}

let archivo : Archivo;