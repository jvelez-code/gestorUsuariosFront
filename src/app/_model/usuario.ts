import { Empresa } from "./empresa";

export class Usuario {

    idUsuario!: number;
    usuario !: String;
    tipoDocumento !: String;
    nroDocumento !: String;
    primerNombre !: String;
    segundoNombre !: String;
    primerApellido !: String;
    segundoApellido !: String;
    perfil !: String;
    empresa !: Empresa;
    estado !: String;

}

let usuario: Usuario