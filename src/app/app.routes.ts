import { Routes } from '@angular/router';
import { FiltroClienteComponent } from './pages/filtro-cliente/filtro-cliente.component';
import { EntrantesComponent } from './pages/entrantes/entrantes.component';
import { SalienteComponent } from './pages/saliente/saliente.component';
import { FiltroSalienteComponent } from './pages/filtro-saliente/filtro-saliente.component';
import { ExtadoExtComponent } from './pages/estado-ext/estado-ext.component';
import { MonitoreosComponent } from './pages/monitoreo/monitoreos.component';
import { GuardService } from './_services/guard.service';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CambiarEmpresaComponent } from './pages/cambiar-empresa/cambiar-empresa.component';
import { GestionComercialComponent } from './pages/gestion-comercial/gestion-comercial.component';
import { SecretariaVirtualComponent } from './pages/secretaria-virtual/secretaria-virtual.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { UsuarioEdicionComponent } from './pages/gestion-usuarios/usuario-edicion/usuario-edicion.component';
import { ProductividadComponent } from './pages/productividad/productividad.component';
import { ExtensionesComponent } from './pages/extensiones/extensiones.component';
import { FidelizacionComponent } from './pages/fidelizacion/fidelizacion.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { LoginComponent } from './pages/login/login.component';
import { CrmCuentasComponent } from './pages/crm-cuentas/crm-cuentas.component';
import { CrmAbiertosComponent } from './pages/crm-abiertos/crm-abiertos.component';
import { FiltroCrmcasosComponent } from './pages/filtro-crmcasos/filtro-crmcasos.component';
import { CargueCampanaComponent } from './pages/cargue-campana/cargue-campana.component';
import { GraficoComponent } from './pages/grafico/grafico.component';
import { LlamadaOnlineComponent } from './pages/llamada-online/llamada-online.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { DetalleGestionComponent } from './pages/reporte/detalle-gestion/detalle-gestion.component';
import { DuracionEstadoComponent } from './pages/reporte/duracion-estado/duracion-estado.component';
import { IvrComponent } from './pages/reporte/ivr/ivr.component';
import { LlamadasCalificadasComponent } from './pages/reporte/llamadas-calificadas/llamadas-calificadas.component';
import { LlamadasPerdidasComponent } from './pages/reporte/llamadas-perdidas/llamadas-perdidas.component';
import { LlamadasRecibidasComponent } from './pages/reporte/llamadas-recibidas/llamadas-recibidas.component';
import { FacturacionComponent } from './pages/reporte/facturacion/facturacion.component';
import { LlamadasCalificadasGDEComponent } from './pages/reporte/llamadas-calificadas-gde/llamadas-calificadas-gde.component';
import { LlamadasFueraHorarioEventualComponent } from './pages/reporte/llamadas-fuera-horario-eventual/llamadas-fuera-horario-eventual.component';
import { LlamadasFueraHorarioComponent } from './pages/reporte/llamadas-fuera-horario/llamadas-fuera-horario.component';
import { RegistrosNuevosComponent } from './pages/reporte/registros-nuevos/registros-nuevos.component';
import { ReporteAgendaComponent } from './pages/reporte/reporte-agenda/reporte-agenda.component';
import { GestionComercialComponentRepo } from './pages/reporte/gestion-comercial/gestion-comercial.component';
import { ConsolidadoGestionesComponent } from './pages/reporte/consolidado-gestiones/consolidado-gestiones.component';
import { ConsolCiclovidaComponent } from './pages/reporte/consol-ciclovida/consol-ciclovida.component';
import { MonitoreoLlamadasComponent } from './pages/reporte/monitoreo-llamadas/monitoreo-llamadas.component';
import { ControlVisitasComponent } from './pages/reporte/control-visitas/control-visitas.component';
import { CompromisoComercialComponent } from './pages/reporte/compromiso-comercial/compromiso-comercial.component';
import { SeguimientoAgenteComponent } from './pages/reporte/seguimiento-agente/seguimiento-agente.component';
import { SecretariaVirtualComponentRepo } from './pages/reporte/secretaria-virtual/secretaria-virtual.component';
import { EntranteSalienteComponent } from './pages/reporte/entrante-saliente/entrante-saliente.component';
import { TmoSalienteComponent } from './pages/reporte/tmo-saliente/tmo-saliente.component';
import { TmoDetalladoComponent } from './pages/reporte/tmo-detallado/tmo-detallado.component';
import { TmoComponent } from './pages/reporte/tmo/tmo.component';
import { PorcentajeComponent } from './pages/reporte/porcentaje/porcentaje.component';
import { FiltradoSecretariaComponent } from './pages/reporte/filtrado-secretaria/filtrado-secretaria.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { IntroComponent } from './pages/intro/intro.component';
import { AskLogEstadosComponent } from './pages/reporte/ask-log-estados/ask-log-estados.component';
import { AuditoriaCalidadComponent } from './pages/auditoria-calidad/auditoria-calidad.component';
import { AsignarCampanaComponent } from './pages/asignar-campana/asignar-campana.component';
import { PagosDiariosComponent } from './pages/reporte/pagos-diarios/pagos-diarios.component';
import { AsignarExtensionComponent } from './pages/asignar-extension/asignar-extension.component';
import { EstadosSubestadosComponent } from './pages/estados-subestados/estados-subestados.component';


export const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'filtroEntrante', component: FiltroClienteComponent, children:[
    { path: 'entrante', component: FiltroClienteComponent }
  ]
 },
  { path: 'gestionEntrante', component: EntrantesComponent },
  { path: 'gestionSaliente', component: SalienteComponent },
  { path: 'filtroSaliente', component: FiltroSalienteComponent },
  { path: 'estadoExtension', component: ExtadoExtComponent },
  { path: 'clientes', component: ClientesComponent, canActivate: [GuardService] },
  { path: 'usuarioEmpresa', component: CambiarEmpresaComponent , canActivate: [GuardService]},
  { path: 'gestionComercial', component: GestionComercialComponent },
  { path: 'secretariaVirtual', component: SecretariaVirtualComponent },
  { path: 'gestionUsuarios', component: GestionUsuariosComponent, children:[
    { path: 'nuevo', component: UsuarioEdicionComponent },
    { path: 'edicion/:id', component: UsuarioEdicionComponent },
    ] 
  },
  { path: 'productividad', component: ProductividadComponent },
  { path: 'extensiones', component: ExtensionesComponent , canActivate: [GuardService]},
  { path: 'fidelizacion', component: FidelizacionComponent },
  { path: 'monitoreo', component: MonitoreosComponent },
  { path: 'filtrosCrmCasos', component: FiltroCrmcasosComponent, canActivate: [GuardService] },
  { path: 'crmCuentas', component: CrmCuentasComponent },//CrmCuentasComponent CasoNuevoComponent
  { path: 'crmCasos', component: CrmAbiertosComponent },
  { path: 'cargueCampana', component: CargueCampanaComponent },
  { path: 'auditoriaCalidad', component: AuditoriaCalidadComponent},
  { path: 'asignarCampana', component: AsignarCampanaComponent},
  { path: 'adminExtension', component: AsignarExtensionComponent },
  { path: 'adminTipificacion', component: EstadosSubestadosComponent },

  { path: 'empresas', component: EmpresasComponent },
  { path: 'grafico', component: GraficoComponent },  ///GraficoComponent
  { path: 'llamadaOnline', component: LlamadaOnlineComponent },
  { path: 'reporte', component: ReporteComponent, children: [
    { path: 'ConsolidadoGestiones', component: DetalleGestionComponent },
    { path: 'DetalladoNuevo', component: DetalleGestionComponent },
    { path: 'DevolucionFiltrada', component: FiltradoSecretariaComponent },
    { path: 'Duracion Estados', component: DuracionEstadoComponent },
    { path: 'ReporteIVR', component: IvrComponent },
    { path: 'CalificacionDelServicio', component: LlamadasCalificadasComponent },
    { path: 'LlamadasPerdidas', component: LlamadasPerdidasComponent },
    { path: 'LlamadasRecibidas', component: LlamadasRecibidasComponent },
    { path: 'PorcentajeXTipificacion', component: PorcentajeComponent },
    { path: 'ReporteTMO', component: TmoComponent },
    { path: 'ReporteTMODetallado', component: TmoDetalladoComponent },
    { path: 'ReporteTMOSaliente', component: TmoSalienteComponent },
    { path: 'TmoEntranteSaliente', component: EntranteSalienteComponent },
    { path: 'SecretariaVirtual', component: SecretariaVirtualComponentRepo },
    { path: 'SeguimientoAgente', component: SeguimientoAgenteComponent },
    { path: 'compromisoscomerciales', component: CompromisoComercialComponent },
    { path: 'ControlVisitas', component: ControlVisitasComponent },
    { path: 'Monitoreo Llamadas', component: MonitoreoLlamadasComponent },
    { path: 'ConsolidadodeCicloVida', component: ConsolCiclovidaComponent },
    { path: 'ConsolidadoGestiones2', component: ConsolidadoGestionesComponent },
    { path: 'DetalladoGestionesComercial', component: GestionComercialComponentRepo },
    { path: 'ReporteAgenda', component: ReporteAgendaComponent },
    { path: 'registrosnuevos', component: RegistrosNuevosComponent },
    { path: 'LlamadasFueraHorario', component: LlamadasFueraHorarioComponent },
    { path: 'LlamadasFueraHorarioEventual', component: LlamadasFueraHorarioEventualComponent },
    { path: 'CalificacionDelServicioGDE', component: LlamadasCalificadasGDEComponent },
    { path: 'FacturacionGde', component: FacturacionComponent },
    { path: 'DetalladoLogEstados', component: AskLogEstadosComponent },
    { path: 'PagosDiarios', component: PagosDiariosComponent },
    ]
  },




  { path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
    
];
