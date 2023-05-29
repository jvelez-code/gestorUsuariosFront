export class FiltroEstadoDTO {

    idExtension?: number;
	loginAgente?: string;
	nroDocumento?: number;
	estadoAsk?: number;
	
	constructor(idExtension: number, loginAgente: string, nroDocumento: number, estadoAsk: number ) {
            
		this.idExtension = idExtension;
		this.loginAgente = loginAgente;
		this.nroDocumento = nroDocumento;
		this.estadoAsk = estadoAsk

    }
}
