export class filtroEntranteDTO {

    tipoDoc: string;
	nroDoc: string;
	nroCliente: string;
	nroContacto: string;
	idEmpresa: string;
	idTipoCampana: string;
	idEstadoPadre: string;
	
	
	
	constructor(tipoDoc: string, nroDoc: string, nroCliente: string, nroContacto: string, idEmpresa: string,
        idTipoCampana: string, idEstadoPadre: string) {
            
		this.tipoDoc = tipoDoc;
		this.nroDoc = nroDoc;
		this.nroCliente = nroCliente;
		this.nroContacto = nroContacto;
		this.idEmpresa = idEmpresa;
		this.idTipoCampana = idTipoCampana;
		this.idEstadoPadre = idEstadoPadre;
	}

}