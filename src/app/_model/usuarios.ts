import { Rol } from "./rol";

export class Usuarios {

idUsuario ?: number;
enabled ?: boolean;
fechaCambio ?: string;
password ?: string;
email ?: string;
roles !: Rol[]
username ?: string;
failed ?: number;
fechaActualizacion ?: string;
fechaCreacion ?: string;
ultimoLog ?: string;




}

let usuarios: Usuarios