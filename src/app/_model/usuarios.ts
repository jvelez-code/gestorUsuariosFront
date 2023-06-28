import { Rol } from "./rol";

export class Usuarios {

idUsuario !: number;
username !: string;
password !: string;
enabled !: boolean;
fechaCambio !: Date;
email !: string;
roles !: Rol

}

let usuarios: Usuarios