export interface Planilla {
  entidadRecaudo: string;
  modalidad: number;
  tipoPlanilla: string;
  numeroPlanilla: string;
  numeroPin: string;
  valorPago: number;
  fechaPago: [number, number, number];
  periodoMes: string;
  periodoAnio: string;
}
