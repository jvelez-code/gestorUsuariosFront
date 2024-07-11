export class ParametrosDTO {

    tipoDoc?: string;
	loginAgente?: string;
	idUsuario?: number;
	nroDocumento?: string;
	idCliente?: number;
	empresa?: string;
	idEmpresa?: number;
	idTipoCampana?: number;
	idEstadoPadre?: number;
	tipoLlamada?: number;
	fechaInicial?: string;
	fechaFinal?: string;
	idDetalleComer?: number;
	cicloVida?: number;
	idGestion?: number;
	idCrmCaso?: number;
	idCrmDetalle?: number;
	idCrmEstado?: number;
	ultimoLogin?: string;
	
	
	constructor(tipoDoc: string, loginAgente: string, idUsuario:number, nroDocumento: string, idCliente: number, 
		empresa: string, idEmpresa: number, idTipoCampana: number, idEstadoPadre: number, tipoLlamada: number,
		fechaInicial: string, fechaFinal: string , idDetalleComer: number , cicloVida: number ,idGestion: number
		,idCrmCaso: number,idCrmDetalle: number,idCrmEstado: number ) {
            
		this.tipoDoc = tipoDoc;
		this.loginAgente = loginAgente;
		this.idUsuario = idUsuario;
		this.nroDocumento = nroDocumento;
		this.idCliente = idCliente;
		this.empresa = empresa;
		this.idEmpresa = idEmpresa;
		this.idTipoCampana = idTipoCampana;
		this.idEstadoPadre = idEstadoPadre;
		this.tipoLlamada = tipoLlamada;
		this.fechaInicial = fechaInicial;
		this.fechaFinal = fechaFinal;
		this.idDetalleComer = idDetalleComer;
		this.cicloVida = cicloVida;
		this.idGestion = idGestion;
		this.idCrmCaso = idCrmCaso;
		this.idCrmDetalle = idCrmDetalle;
		this.idCrmEstado = idCrmEstado;
	}
}

let parametrosDTO : ParametrosDTO;
