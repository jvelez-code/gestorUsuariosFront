export class LlamadaEntranteDTO {

    idAsterisk?: string;
	numero_documento?: string;
	tipo_doc?: string;
	tmoUsuario?: string;
	empresa?: string;
    idLlamadaEntrante ?: number;
	idAgente ?: number;

	
	constructor(idAsterisk: string, numero_documento: string, tipo_doc:string, tmoUsuario: string, empresa: string,
		idLlamadaEntrante : number, idAgente : number
 ) {
            
		this.idAsterisk = idAsterisk;
		this.numero_documento = numero_documento;
		this.tipo_doc = tipo_doc;
		this.tmoUsuario = tmoUsuario;
		this.empresa = empresa;
        this.idLlamadaEntrante = idLlamadaEntrante;
	}
}

let llamadaEntranteDTO : LlamadaEntranteDTO;