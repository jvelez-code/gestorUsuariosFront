import { Divipola } from "./divipola";
import { TipoDocumento } from "./tipoDocumento";
import { Usuario } from "./usuario";

export class Cliente {

    idCliente ?: number;
    tipoDocumento ?: TipoDocumento;
    nroDocumento ?: String;
    correo ?: String;
    razonSocial ?: String;
    direccion ?: String;
    cantidadEmpleados ?: String;
    fechaHoraSistema ?: String;
    ip ?: String;
    usuario?: Usuario;  
    telefonoCelular ?: String;
    telefonoFijo ?: String;    
    ley1581  ?: Boolean;
    divipola ?: Divipola;
    

}

let cliente : Cliente;