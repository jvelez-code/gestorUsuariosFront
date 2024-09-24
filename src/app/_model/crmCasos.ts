import { Cliente } from "./cliente";
import { CrmDepartamento } from "./crmDepartamento";
import { CrmDetalle } from "./crmDetalle";
import { CrmEstado } from "./crmEstado";
import { CrmFuente } from "./crmFuente";
import { CrmNivel } from "./crmNivel";
import { CrmOrigen } from "./crmOrigen";
import { CrmProceso } from "./crmProceso";
import { CrmTipologia } from "./crmTipologia";

export class CrmCasos {

    idCaso ?: number;
    nroRealmarcado ?: string;
    fechaCaso ?: string;
    fechaVencimiento ?: string;
    fechaCierre ?: string;
    crmTipologia ?: CrmTipologia;
    crmEstado ?: CrmEstado;
    crmNivel ?: CrmNivel;
    crmOrigen ?: CrmOrigen;
    crmProceso ?: CrmProceso;
    crmFuente ?: CrmFuente;
    crmDepartamento ?: CrmDepartamento;
    cliente?: Cliente; 
    listaDetalle?: CrmDetalle[];
    
}

let crmCasos : CrmCasos;