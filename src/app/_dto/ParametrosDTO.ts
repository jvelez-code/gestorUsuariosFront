export class ParametrosDTO {

    tipoDoc?: string;
	loginAgente?: string;
	nroDocumento?: string;
	idCliente?: number;
	idEmpresa?: number;
	idTipoCampana?: number;
	idEstadoPadre?: number;
	tipoLlamada?: number;
	fechaInicial?: string;
	fechaFinal?: string;
	idDetalleComer?: number;
	cicloVida?: number;
	
	
	constructor(tipoDoc: string, loginAgente: string, nroDocumento: string, idCliente: number, 
		idEmpresa: number, idTipoCampana: number, idEstadoPadre: number, tipoLlamada: number,
		fechaInicial: string, fechaFinal: string , idDetalleComer: number , cicloVida: number ) {
            
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
		this.idDetalleComer = idDetalleComer;
		this.cicloVida = cicloVida;
	}
}

let parametrosDTO : ParametrosDTO;