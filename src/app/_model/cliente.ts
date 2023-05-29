import { TipoDocumento } from "./tipoDocumento";

export class Cliente {

    idCliente ?: number;
    tipoDoc ?: TipoDocumento;
    nroDoc ?: String;
    razonSocial ?: String;
    ciudad ?: String;
    direccion ?: String;
    telCel ?: String;
    telFijo ?: String;
    correo ?: String;
    observacion  ?: String;
    

}

let cliente : Cliente;