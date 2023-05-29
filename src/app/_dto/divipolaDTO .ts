export class DivipolaDTO {

    idZona?: number;
	nombre?: string;
	departamento?: number;
	
	
	constructor(idZona: number, nombre: string, departamento: number ) {
            
		this.idZona = idZona;
		this.nombre = nombre;
		this.departamento = departamento;

    }
}
