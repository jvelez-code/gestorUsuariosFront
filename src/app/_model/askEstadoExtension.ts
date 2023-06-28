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

    	
	constructor(idExtension: number, loginAgente: string, askEstado: AskEstado, 
        numeroOrigen: string, 
		fechahoraUltimaLlamada: string, nroDocumento: string, 
        empresaAsk: string
		)
         {
            
		this.idExtension = idExtension;
		this.loginAgente = loginAgente;
		this.askEstado = askEstado;
		this.numeroOrigen = numeroOrigen;
		this.fechahoraUltimaLlamada = fechahoraUltimaLlamada;
		this.nroDocumento = nroDocumento;
		this.empresaAsk = empresaAsk;
    	}
}
    



let askEstadoExtension : AskEstadoExtension;