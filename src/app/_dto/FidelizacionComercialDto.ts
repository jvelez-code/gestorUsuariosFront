
export class FidelizacionComercialDto {
    idFidelizacion?: number
    idDetalleGestionComercial?: number
    idCliente?: number
    idAgente?: number
    codCaja?: string
    regNuevos?: number
    regRecuperados?: number
    fechaPago?: string
    numPlanilla?: number
    observacion?: string
    migracion?: string
    sucursal?: string
    fechaGestion?: string

}

let fidelizacionComercialDto : FidelizacionComercialDto