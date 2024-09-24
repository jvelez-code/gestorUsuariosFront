import { TipoDocumento } from "./tipoDocumento";

export class LlamadaEntrante {

    idLlamadaEntrante!: number;
    idExtension!: number;
    rutaEntrante!: number;
    fechaHora!: string;
    fechaHoraAsterisk!: string;
    tipoDocumento !: TipoDocumento;
    numeroDocumento!: string;
    tipoCliente!: string;
    claseCliente !: string;
    numeroOrigen!: number;
    deseaDevolucion!: boolean;
    numeroDevolucion!: string;
    idDetalleGestion!: number;
    numeroIntentosFallidos!: number;
    idAgente!: number;
    fechaDevolucion!: string;
    opcionEntrante!: number;
    empresa !: string;
    intento1 !: string;
    intento2 !: string;
    intento3 !: string;  

}


let llamadaEntrante : LlamadaEntrante;