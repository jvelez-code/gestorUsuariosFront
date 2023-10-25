export class CicloVida {

    idCiclo?: number;
	nombre?: string;	
	
	constructor(idCiclo: number, nombre: string ) {
            
		this.idCiclo = idCiclo;
		this.nombre = nombre;
    }
}

let cicloVida : CicloVida;