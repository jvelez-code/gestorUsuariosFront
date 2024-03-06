export class FiltroDetalleGestionDTO {

    fecha?: string;
	usuario?: string;
	campana?: string;
	tipo?: string;
	subtipo?: string;
	observacion?: string;
	numero?: string;
	idGestion?: number;
	idAgente?: number;
	idEstadoGestion?: number;
	usuarioAct?: string;
	ipAct?: string;
	extension?: string;


	constructor(
        fecha: string, usuario: string, nroDocumento: string, campana: string,
        tipo: string,  subtipo: string, observacion: string, numero: string, idGestion: number, idAgente: number, 
		idEstadoGestion: number, usuarioAct: string, ipAct: string, extension: string
	) {
            
		this.fecha = fecha;
		this.usuario = usuario;
		this.campana = campana;
		this.tipo = tipo
        this.subtipo = subtipo
        this.observacion = observacion
        this.numero = numero;
		this.idGestion = idGestion;
		this.idAgente = idAgente;
		this.idEstadoGestion = idEstadoGestion;
		this.usuarioAct = usuarioAct;
		this.ipAct = ipAct; 
		this.extension = extension;

    }
}

let filtroDetalleGestionDTO: FiltroDetalleGestionDTO;