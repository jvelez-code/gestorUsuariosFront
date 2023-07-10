export class CantidadGestionDTO {

    cantidad?: number;
	usuario?: string;
	efectiva?: string;
	
	
	constructor(cantidad: number, usuario: string, efectiva: string ) {
            
		this.cantidad = cantidad;
		this.usuario  = usuario;
		this.efectiva = efectiva;

    }
}

let cantidadGestionDTO : CantidadGestionDTO;