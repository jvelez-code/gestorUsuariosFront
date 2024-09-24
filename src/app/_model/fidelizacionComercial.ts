import { Cliente } from "./cliente";
import { DetalleGestionComercial } from "./detalleGestionComercial";
import { Usuario } from "./usuario";


export class FidelizacionComercial {

    idFidelizacion ?: number ;
    idDetalleGestionComercial?: DetalleGestionComercial;
    idCliente?: Cliente ;
    idUsuario?: Usuario ;
    codCaja?: string ;
    registrosNuevos ?: number ;
    registrosRecuperados ?: number 
    fechaPago?: string ;
    numeroPlanilla?: string ;
    observacion?: string ;
    migracion?: string ; 
    sucursal ?: string ;
    fechaGestion?: Date ;
}

let fidelizacionComercial : FidelizacionComercial;