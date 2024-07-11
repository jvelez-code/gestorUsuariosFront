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

    private urlcategoria = `${environment.HOST}/crmCategoria`
    private urlsubcategoria = `${environment.HOST}/crmSubcategoria`
    private urltipologia = `${environment.HOST}/crmTipologia`
    private urlEstados = `${environment.HOST}/crmEstados`
    private urlDepartamentos = `${environment.HOST}/crmDepartamentos`

    public listarCategorias() :Observable<CrmCategoria[]> {
      return this.http.get<CrmCategoria[]>(this.urlcategoria, {});
    }
  
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

    actualizaCaso(parametrosDTO: ParametrosDTO): Observable<void> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<void>(`${this.url}/actualizaCaso`,parametrosDTO, { headers });
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
