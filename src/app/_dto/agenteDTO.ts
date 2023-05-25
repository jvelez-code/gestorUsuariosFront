export class AgenteDTO {

    idUsuario?: number;
	usuario?: string;
	nroDocumento?: string;
	primerNombre?: string;
	primerApellido?: string;
	idEmpresa?: number;
	pseudonimo?: string;
	descripcion?: string;
	idCampanaE?: number;
	nombreCamE?: string;
	tipoLlamadaCamE?: string;
	idCampanaS?: number;
	nombreCamS?: string;
	tipoLlamadaCamS?: string;
	hostIp?: string;
	
	
	constructor(idUsuario: number, usuario: string, nroDocumento: string, primerNombre: string, 
		primerApellido: string, idEmpresa: number, pseudonimo: string, 
		descripcion: string, 
		idCampanaE: number,
		nombreCamE : string,
		tipoLlamadaCamE: string,
		idCampanaS: number,
		nombreCamS: string,
		tipoLlamadaCamS: string,
		hostIp: string
		) {
            
		this.idUsuario = idUsuario;
		this.usuario = usuario;
		this.nroDocumento = nroDocumento;
		this.primerNombre = primerNombre;
		this.primerApellido = primerApellido;
		this.idEmpresa = idEmpresa;
		this.pseudonimo = pseudonimo;
		this.descripcion = descripcion;
		this.idCampanaE = idCampanaE;
		this.nombreCamE = nombreCamE;
		this.tipoLlamadaCamE = tipoLlamadaCamE;
		this.idCampanaS = idCampanaS;
		this.nombreCamS = nombreCamS;
		this.tipoLlamadaCamS = tipoLlamadaCamS;
		this.hostIp = hostIp;
	}
}

let agenteDTO : AgenteDTO;