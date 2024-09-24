import { Planilla } from "./Planilla";

export interface RespuestaPila {
  status: number;
  object: {
    ELECTRONICAS: Planilla[];
    ASISTIDAS: Planilla[];
    entidadRecaudo: string | null;
    modalidad: number | null;
    tipoPlanilla: string;
    numeroPlanilla: string;
    numeroPin: string;
    valorPago: number;
    fechaPago: [number, number, number];
    periodoMes: string;
    periodoAnio: string;
  };
  value: string;
  message: string;
}
