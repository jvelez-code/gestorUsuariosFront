import { AskEstado } from "./askEstado";

export interface AskLogEstado {
  idLogEstado: number;
  idExtension: number;
  fechaHoraInicioEstado: string;
  fechaHoraFinEstado: string;
  estado: AskEstado;
}