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
    deseaDevolucion!: number;
    numeroDevolucion!: string;
    idDetalleGestion!: string;
    numeroIntentosFallidos!: string;
    idAgente!: string;
    fechaDevolucion!: string;
    opcionEntrante!: string;
    empresa !: string;
    intento1 !: string;
    intento2 !: string;
    intento3 !: string;  

}


let llamadaEntrante : LlamadaEntrante;