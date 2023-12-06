export class CantidadGestionDTO {

    cantidad?: number;
	usuario?: string;
	efectiva?: string;
	empresa?: string;
	promedio?: string;
	tmousuario?: string;
	
	
	constructor(cantidad: number, usuario: string, efectiva: string, 
		empresa: string, promedio: string, tmousuario: string ) {
            
		this.cantidad = cantidad;
		this.usuario  = usuario;
		this.efectiva = efectiva;
		this.empresa = empresa;
		this.promedio = promedio;
		this.tmousuario = tmousuario;

    }
}

let cantidadGestionDTO : CantidadGestionDTO;