import { FidelizacionComercialDto } from "./FidelizacionComercialDto"


export class GestionComercialDto {

    fechaGestionCargue?: string
    tipoDocumentoCliente?: string
    nroDocumentoCliente?: string
    razonSocialCliente?: string
    nombreContacto?: string
    numeroContacto?: string
    celularContacto?: string
    correoElectronicoContacto?: string
    ciudadCliente?: string
    direccionCliente?: string
    nombreMotivo?: string
    regProyectadosCliente?: string
    nombreEstadoGestion?: string
    regObtenidosCliente?: string
    observacionDetGestion?: string
    nroGestionRealizadaDetGestion?: string
    compromisosDetGestion?: string
    fechaGestion?: string
    idDetalleGestionComercial?: number
    idAgente?: number
    idCliente?: number
    gestionRealizada?: string
    nombreUsuario?: string
    fidelizacionDto?: FidelizacionComercialDto
    idEstadoGestion?: number
    idMotivo?: number
    idZonaDivipola?: number
    ciclodeVida?: number
    activar?: Boolean





    public GestionComercialDto() {

    }


}

let gestionComercialDto: GestionComercialDto;
