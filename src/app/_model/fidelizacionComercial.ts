import { Cliente } from "./cliente";
import { DetalleGestionComercial } from "./detalleGestionComercial";
import { Usuario } from "./usuario";


export class FidelizacionComercial {

    idFidelizacion ?: number ;
    idDetalleGestionComercial?: DetalleGestionComercial;
    idCliente?: Cliente ;
    idUsuario?: Usuario ;
    codCaja?: String ;
    registrosNuevos ?: number ;
    registrosRecuperados ?: number 
    fechaPago?: String ;
    numeroPlanilla?: String ;
    observacion?: String ;
    migracion?: String ; 
    sucursal ?: String ;
    fechaGestion?: String ;
}

let fidelizacionComercial : FidelizacionComercial;