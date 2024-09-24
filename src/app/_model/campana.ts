import { Empresa } from "./empresa";
import { EstadoCampana } from "./estadoCampana";
import { TipoCampana } from "./tipoCampana";

export class Campana {

    idCampana?: number;
    tipoCampana?: TipoCampana;
    estadoCampana?: EstadoCampana;
    tiempoCargueCampana?: Date;
    fechaHoraCargue?: string;
    idCoordinador?: number;
    tipoAsignacion?: number;
    grupoRol?: string;
    nombre?: string;
    empresa ?: Empresa;   

}

let campana : Campana;