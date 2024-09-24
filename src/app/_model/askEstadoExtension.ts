import { AskEstado } from "./askEstado";

export class AskEstadoExtension {

    idExtension ?: number;
    loginAgente ?: string;
    askEstado ?: AskEstado;
    numeroOrigen ?: string;
    fechahoraUltimaLlamada ?: string;
    fechahoraInicioEstado ?: Date;
    nroDocumento ?: string;
    empresaAsk ?: string;
    activoAsk  ?: boolean;
    id_extension?: number ;
    login_agente?: string ;
    descripcion?: string ;
    tiempoTotal?: string;
    numero_origen ?: number;
    fechahora_inicio_estado?: string;
    total ?: string
    	
	constructor(idExtension: number, loginAgente: string, askEstado: AskEstado, 
        numeroOrigen: string, 
		fechahoraUltimaLlamada: string, nroDocumento: string, 
        empresaAsk: string, id_extension: number, login_agente: string, descripcion: string,tiempoTotal: string,
        numero_origen : number,fechahora_inicio_estado: string,total : string
		)
         {
            
		this.idExtension = idExtension;
		this.loginAgente = loginAgente;
		this.askEstado = askEstado;
		this.numeroOrigen = numeroOrigen;
		this.fechahoraUltimaLlamada = fechahoraUltimaLlamada;
		this.nroDocumento = nroDocumento;
		this.empresaAsk = empresaAsk;
        this.id_extension = id_extension;
        this.login_agente = login_agente;
        this.descripcion = descripcion;
        this.tiempoTotal = tiempoTotal;
        this.numero_origen = numero_origen;
        this.id_extension = id_extension;
        this.id_extension = id_extension;
        this.fechahora_inicio_estado = fechahora_inicio_estado;
        this.total = total;

    	}
}
    



let askEstadoExtension : AskEstadoExtension;