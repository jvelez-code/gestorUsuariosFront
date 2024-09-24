import { CrmCasos } from "./crmCasos";
import { Usuario } from "./usuario";


export class CrmDetalle {

    idDetalle ?: number;
    fechaDetalle ?: string;
    observacion ?: string;
    crmCasos ?: CrmCasos;
    usuario ?: Usuario;
}

let crmDetalle : CrmDetalle;