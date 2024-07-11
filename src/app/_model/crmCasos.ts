import { Cliente } from "./cliente";
import { CrmDepartamento } from "./crmDepartamento";
import { CrmDetalle } from "./crmDetalle";
import { CrmEstado } from "./crmEstado";
import { CrmNivel } from "./crmNivel";
import { CrmTipologia } from "./crmTipologia";

export class CrmCasos {

    idCaso ?: number;
    nroRealmarcado ?: string;
    fechaGestion ?: Date;
    fechaVencimiento ?: Date;
    crmTipologia ?: CrmTipologia;
    crmEstado ?: CrmEstado;
    crmNivel ?: CrmNivel;
    crmDepartamento ?: CrmDepartamento;
    cliente?: Cliente; 
    listaDetalle?: CrmDetalle[];
    
}

let crmCasos : CrmCasos;