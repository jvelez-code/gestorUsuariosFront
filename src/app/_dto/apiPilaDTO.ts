
export class ApiPilaDto {

    tipoIdentificacionAportante?: string
    nroIdentificacionAportante?: string
    tipoIde?: string | undefined
    numeroIde?: string | undefined
    anoGeneracion?: string
    mesGeneracion?: string
    modalidad?: number
    regRecuperados?: string
    tipoDocumento?: string
    nroDocumento?: string
    nombre?: string
    telefono?: string
    email?: string
    mensaje?: string
    usuario?: string
    planilla?: string
    reporte?: number
}

let apiPilaDto : ApiPilaDto