import { AskEstado } from "./askEstado";

export class AskEstadoExtension {

    idExtension ?: number;
    loginAgente ?: String;
    askEstado ?: AskEstado;
    numeroOrigen ?: String;
    fechahoraUltimaLlamada ?: String;
    fechahoraInicioEstado ?: Date;
    nroDocumento ?: String;
    empresaAsk ?: String;
    activoAsk  ?: boolean;
    

}

let askEstadoExtension : AskEstadoExtension;