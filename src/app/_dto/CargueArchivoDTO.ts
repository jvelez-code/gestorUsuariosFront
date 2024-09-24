export class CargueArchivoDTO {

    tipoDocumento?: string;
    nroDocumento?: string;
    razonSocial?: string;
    codMunicipio?: string;
    telefonoMovi?: string;
    telefonoTrab?: string;
    telefonoResi?: string;
    correo?: string;
    idCliente?: number;

    constructor(
        tipoDocumento: string,
        nroDocumento: string,
        razonSocial: string,
        codMunicipio: string,
        telefonoMovi: string,
        telefonoTrab: string,
        telefonoResi: string,
        correo: string,
        idCliente: number
    ) {
        this.tipoDocumento = tipoDocumento;
        this.nroDocumento = nroDocumento;
        this.razonSocial = razonSocial;
        this.codMunicipio = codMunicipio;
        this.telefonoMovi = telefonoMovi;
        this.telefonoTrab = telefonoTrab;
        this.telefonoResi = telefonoResi;
        this.correo = correo;
        this.idCliente = idCliente;
    }
}

let cargueArchivoDTO : CargueArchivoDTO;
