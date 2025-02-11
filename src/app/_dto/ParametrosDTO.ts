export interface ParametrosDTO {

    tipoDoc?: string;
	loginAgente?: string;
	idUsuario?: number;
	nroDocumento?: string;
	idCliente?: number;
	idUsuarios?: number[];
	empresa?: string;
	idEmpresa?: number;
	idTipoCampana?: number;
	idEstadoPadre?: number;
	tipoLlamada?: number;
	fechaInicial?: string;
	fechaFinal?: string;
	idDetalleComer?: number;
	cicloVida?: number;
	campanaSal?: number;
	idGestion?: number;
	nombreArchivo?: string;
	clienteNuevo?: number;
	gestionNuevo?: number;
    ultimoLogin?: string;
	password?: string;
	extension?: string;
	idCrmCaso?: number;
	idCrmDetalle?: number;
	idCrmEstado?: number;	
	idExtension?: number;

	[key: string]: any;
	
}