export class ParametrosDTO {

    tipoDoc?: string;
	loginAgente?: string;
	nroDocumento?: number;
	idCliente?: number;
	idEmpresa?: number;
	idTipoCampana?: number;
	idEstadoPadre?: number;
	tipoLlamada?: number;
	fechaInicial?: string;
	fechaFinal?: string;
	
	
	constructor(tipoDoc: string, loginAgente: string, nroDocumento: number, idCliente: number, 
		idEmpresa: number, idTipoCampana: number, idEstadoPadre: number, tipoLlamada: number,
		fechaInicial: string, fechaFinal: string ) {
            
		this.tipoDoc = tipoDoc;
		this.loginAgente = loginAgente;
		this.nroDocumento = nroDocumento;
		this.idCliente = idCliente;
		this.idEmpresa = idEmpresa;
		this.idTipoCampana = idTipoCampana;
		this.idEstadoPadre = idEstadoPadre;
		this.tipoLlamada = tipoLlamada;
		this.fechaInicial = fechaInicial;
		this.fechaFinal = fechaFinal;
	}
}

let parametrosDTO : ParametrosDTO;