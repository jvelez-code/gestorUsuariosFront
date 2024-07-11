import { Divipola } from "./divipola";
import { TipoDocumento } from "./tipoDocumento";
import { Usuario } from "./usuario";

export class Cliente {

    idCliente ?: number;
    tipoDocumento ?: TipoDocumento;
    nroDocumento ?: string;
    correo ?: string;
    razonSocial ?: string;
    direccion ?: string;
    cantidadEmpleados ?: string;
    fechaHoraSistema ?: Date;
    ip ?: string;
    usuario?: Usuario;  
    telefonoCelular ?: string;
    telefonoFijo ?: string;    
    ley1581  ?: boolean;
    divipola ?: Divipola;
    

}

let cliente : Cliente;
