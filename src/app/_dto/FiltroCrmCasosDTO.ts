export class FiltroCrmCasosDTO {

    idCaso ?: number
	tipoDocumento ?: string
	nroDocumento ?: string
	nroRealmarcado ?: string
	fechaGestion ?: string
	fechaVencimiento ?: string
	nombreCategoria ?: string
	nombreSubcategoria ?: string
	nombreTipologia ?: string
	nombreEstado ?: string
	nombreNivel ?: string
	nombreDepartamento ?: string
    

	constructor(
        idCaso?: number,
        tipoDocumento?: string,
        nroDocumento?: string,
        nroRealmarcado?: string,
        fechaGestion?: string,
        fechaVencimiento?: string,
        nombreCategoria?: string,
        nombreSubcategoria?: string,
        nombreTipologia?: string,
        nombreEstado?: string,
        nombreNivel?: string,
        nombreDepartamento?: string
    ) {
        this.idCaso = idCaso;
        this.tipoDocumento = tipoDocumento;
        this.nroDocumento = nroDocumento;
        this.nroRealmarcado = nroRealmarcado;
        this.fechaGestion = fechaGestion;
        this.fechaVencimiento = fechaVencimiento;
        this.nombreCategoria = nombreCategoria;
        this.nombreSubcategoria = nombreSubcategoria;
        this.nombreTipologia = nombreTipologia;
        this.nombreEstado = nombreEstado;
        this.nombreNivel = nombreNivel;
        this.nombreDepartamento = nombreDepartamento;
    }
	

}
