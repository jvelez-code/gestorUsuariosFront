export class FiltroCrmDetallesDTO {

    idDetalle ?:number;
    idCrmCaso ?:number;
    idUsuario ?:number;
	fechaDetalle ?:string;
	observacion ?:string;
	usuario ?: string;
    idCategoria ?:number;
    idCrmEstado ?:number;
    idCliente ?:number;


    constructor(
        idDetalle: number,
        idCrmCaso: number,
        idUsuario: number,
        fechaDetalle: string,
        observacion: string,
        usuario: string,
        idCategoria: number,
        idCrmEstado :number,
        idCliente :number,
    ) {
        this.idDetalle = idDetalle;
        this.idCrmCaso = idCrmCaso;
        this.idUsuario = idUsuario;
        this.fechaDetalle = fechaDetalle;
        this.observacion = observacion;
        this.usuario = usuario;
        this.idCategoria = idCategoria;
        this.idCrmEstado = idCrmEstado;
        this.idCliente = idCliente;
    }


}