import { Cliente } from "./cliente";
import { Gestion } from "./gestion";

export class Contacto {

    idContacto !: number ;
    cliente ?: Cliente ; 
    gestion !: Gestion ;
    nombre !: String ;
    correoElectronico !: String ;
    numeroContacto !: String ;
    telefonoDirecto !: String ;
    telefonoCelular !: String ;
    nroEmpleado !: number
}

let contacto : Contacto