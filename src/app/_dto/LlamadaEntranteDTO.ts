export class LlamadaEntranteDTO {

    idAsterisk?: string;
	numeroDocumento?: string;
	tipoDoc?: string;
	tmoUsuario?: string;
	empresa?: string;
    idLlamadaEntrante ?: number;
	idAgente ?: number;

	
	constructor(idAsterisk: string, numeroDocumento: string, tipoDoc:string, tmoUsuario: string, empresa: string,
		idLlamadaEntrante : number, idAgente : number
 ) {
            
		this.idAsterisk = idAsterisk;
		this.numeroDocumento = numeroDocumento;
		this.tipoDoc = tipoDoc;
		this.tmoUsuario = tmoUsuario;
		this.empresa = empresa;
        this.idLlamadaEntrante = idLlamadaEntrante;
	}
}

let llamadaEntranteDTO : LlamadaEntranteDTO;