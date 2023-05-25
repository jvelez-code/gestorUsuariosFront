export class FiltroEntranteDTO {

    tipoDoc?: string;
	loginAgente?: string;
	nroDocumento?: number;
	idCliente?: number;
	idEmpresa?: number;
	idTipoCampana?: number;
	idEstadoPadre?: number;
	tipoLlamada?: number;
	
	
	constructor(tipoDoc: string, loginAgente: string, nroDocumento: number, idCliente: number, 
		idEmpresa: number, idTipoCampana: number, idEstadoPadre: number, tipoLlamada: number) {
            
		this.tipoDoc = tipoDoc;
		this.loginAgente = loginAgente;
		this.nroDocumento = nroDocumento;
		this.idCliente = idCliente;
		this.idEmpresa = idEmpresa;
		this.idTipoCampana = idTipoCampana;
		this.idEstadoPadre = idEstadoPadre;
		this.tipoLlamada = tipoLlamada;
	}
}

let filtroEntranteDTO : FiltroEntranteDTO;