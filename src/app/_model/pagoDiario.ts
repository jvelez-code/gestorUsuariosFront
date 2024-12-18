export interface PagosDiarios {
  
  _id: string;
  fechaPago: number; // Es un valor de tipo número (representando la fecha en formato timestamp)
  aportante: string;
  tipoIdentificacion: string;
  numIdentificacion: string;
  tipoEntidad: string;
  numTrabajadores: number;
  numAdministradoras: number;
  totalPago: number;
  originador: string;
  tipoPago: string;
  numeroPlanilla: string;
  formaPago: string;
  entidad: string;
  anioPago: string;
  mesPago: string;
  departamento: number;
  municipio: number;
  email: string;
  telefono: string;
  direccion: string;
  celular: string;
  sucursal: string;
  registroSalida: number;
  usuario: string;
  cantidadPagos: number;
  tipoPlanilla: string;
  entidadRecaudo: string;
  __v: number;
}
