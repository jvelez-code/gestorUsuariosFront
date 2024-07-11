import { Empresa } from "./empresa";


export class EstadoGestion {
    
    
    
    idEstadoGestion ?: number;
    nombre ?: string;
    idEstadoGestionPadre ?: number;
    aplicaDG ?: boolean;
    estadoFinal ?: boolean;
    esEfectiva ?: boolean;
    permiteCambio ?: boolean;
    tipoLlamada ?: number;
    empresa ?: Empresa;
}

let estadoGestion : EstadoGestion ;