import { Cliente } from "./cliente";
import { MonitoreoPlandeaccion } from "./monitoreoPlandeaccion";
import { Usuario } from "./usuario";

export class MonitoreoGrabaciones {
    idMonitoreo?: number;                    
    fechaMonitoreo?: string;                 
    usuarioc?: Usuario;                      
    usuario?: Usuario;                       
    cliente?: Cliente;                       
    monitoreoPlandeaccion?: MonitoreoPlandeaccion; 
    canalComunicacion?: string;               
    monitoreoObservacion?: string;            
    calificacionTotal?: number;               
    
}

let monitoreoGrabaciones : MonitoreoGrabaciones;