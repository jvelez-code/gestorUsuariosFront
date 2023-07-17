import { Cliente } from "./cliente";
import { Divipola } from "./divipola";
import { Gestion } from "./gestion";
import { Usuario } from "./usuario";

export class Contacto {

    idContacto !: number ;
    cliente ?: Cliente ; 
    gestion !: Gestion ;
    usuario?: Usuario;
    divipola ?: Divipola;
    nombre !: String ;
    correoElectronico !: String ;
    numeroContacto !: String ;
    telefonoDirecto !: String ;
    telefonoCelular !: String ;
    nroEmpleado !: number;

}

let contacto : Contacto