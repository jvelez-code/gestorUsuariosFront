import { Empresa } from "./empresa";

export class Usuario {

    idUsuario!: number;
    usuario !: string;
    tipoDocumento !: string;
    nroDocumento !: string;
    primerNombre !: string;
    segundoNombre !: string;
    primerApellido !: string;
    segundoApellido !: string;
    perfil !: string;
    empresa !: Empresa;
    estado !: string;

}

let usuario: Usuario