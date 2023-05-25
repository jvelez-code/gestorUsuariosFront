import { Campana } from "./campanas";
import { Usuario } from "./usuario";
import { Empresa } from "./empresa";

export class AgenteCampana {

    idAgenteCampana !: number;
    usuario!: Usuario;
    campana!: Campana;
    empresa!: Empresa;
    activo!: String;
}

let tipoDocumento : AgenteCampana ;