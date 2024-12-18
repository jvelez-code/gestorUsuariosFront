import { Campana } from "./campana";
import { Usuario } from "./usuario";
import { Empresa } from "./empresa";

export class AgenteCampana {

    idAgenteCampana !: number;
    usuario!: Usuario;
    campana!: Campana;
    empresa!: Empresa;
    activo!: String;
}

let agenteCampana : AgenteCampana ;