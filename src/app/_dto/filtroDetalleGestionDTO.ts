export class FiltroDetalleGestionDTO {

    fecha?: string;
	usuario?: string;
	campana?: string;
	tipo?: string;
	subtipo?: string;
	observacion?: string;
	numero?: string;


	constructor(
        fecha: string, usuario: string, nroDocumento: string, campana: string,
        tipo: string,  subtipo: string, observacion: string, numero: string ) {
            
		this.fecha = fecha;
		this.usuario = usuario;
		this.campana = campana;
		this.tipo = tipo
        this.subtipo = subtipo
        this.observacion = observacion
        this.numero = numero

    }


}