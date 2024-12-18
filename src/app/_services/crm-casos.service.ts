import { Injectable } from '@angular/core';
import { CrmCasos } from '../_model/crmCasos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';
import { ParametrosDTO } from '../_dto/ParametrosDTO';
import { Observable, Subject } from 'rxjs';
import { CrmCategoria } from '../_model/crmCategoria';
import { CrmEstado } from '../_model/crmEstado';
import { CrmSubCategoria } from '../_model/crmSubCategoria';
import { CrmTipologia } from '../_model/crmTipologia';
import { CrmDepartamento } from '../_model/crmDepartamento';
import { CrmFuente } from '../_model/crmFuente';
import { CrmOrigen } from '../_model/crmOrigen';
import { CrmProceso } from '../_model/crmProceso';
import { FiltroCrmDetallesDTO } from '../_dto/FiltroCrmDetallesDTO';

@Injectable({
  providedIn: 'root'
})
export class CrmCasosService extends GenericService<CrmCasos> {

  private crmCasosCambio = new Subject<CrmCasos[]>();
  private mensajeCambio = new Subject<string>();

  constructor ( protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/crmCasos`
    ) }

    
    private urlsubcategoria = `${environment.HOST}/crmSubcategoria`
    private urltipologia = `${environment.HOST}/crmTipologia`
    private urlEstados = `${environment.HOST}/crmEstados`
    private urlDepartamentos = `${environment.HOST}/crmDepartamentos`
    private urlFuentes = `${environment.HOST}/crmFuentes`
    private urlOrigenes = `${environment.HOST}/crmOrigenes`
    private urlProcesos = `${environment.HOST}/crmProcesos`

    
    public listarEstados() :Observable<CrmEstado[]> {
      return this.http.get<CrmEstado[]>(this.urlEstados, {});
    }
  
    public listarDepartamentos() :Observable<CrmDepartamento[]> {
      return this.http.get<CrmDepartamento[]>(`${this.urlDepartamentos}`, {});
    }

    public listarSubcategorias(id :number) :Observable<CrmSubCategoria[]> {
      return this.http.get<CrmSubCategoria[]>(`${this.urlsubcategoria}/listarPorCat/${id}`, {});
    }
  
    public listarTipologias(id :number) :Observable<CrmTipologia[]> {
      return this.http.get<CrmTipologia[]>(`${this.urltipologia}/listarPorSub/${id}`, {});
    }


    public listarFuentes() :Observable<CrmFuente[]> {
      return this.http.get<CrmFuente[]>(`${this.urlFuentes}`, {});
    }

    public listarOrigenes() :Observable<CrmOrigen[]> {
      return this.http.get<CrmOrigen[]>(`${this.urlOrigenes}`, {});
    }

    public listarProcesos() :Observable<CrmProceso[]> {
      return this.http.get<CrmProceso[]>(`${this.urlProcesos}`, {});
    }
  
    crearCasoNuevo(crmCasos: CrmCasos):Observable<CrmCasos> {
      return this.http.post<CrmCasos>(`${this.url}`, crmCasos);
    }
  
    listarCasos( parametrosDTO: ParametrosDTO ):Observable<CrmCasos[]> {
      const headers = { 'content-type': 'application/json'}
      return this.http.post<CrmCasos[]>(`${this.url}/casosCliente`,parametrosDTO,{'headers':headers});
    }

   casosCliente(parametrosDTO: ParametrosDTO) :Observable<CrmCasos[]> {
      const headers = { 'content-type': 'application/json'}
      return this.http.post<CrmCasos[]>(`${this.url}/casosCliente`,parametrosDTO,{'headers':headers});
    }

    casosEstado() :Observable<CrmCasos[]> {
      return this.http.get<CrmCasos[]>(`${this.url}/casosEstado`, {});
    }

    actualizaCaso(filtro: FiltroCrmDetallesDTO): Observable<void> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<void>(`${this.url}/actualizaCaso`,filtro, { headers });
    }

    

   ////////////////// get, set ////////////////

  getCrmCasosCambio(){
    return this.crmCasosCambio.asObservable();
  }

  setCrmCasosCambio(crmCasos: CrmCasos[]){
    this.crmCasosCambio.next(crmCasos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajecambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }

}
