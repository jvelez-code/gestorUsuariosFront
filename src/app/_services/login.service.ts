import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgenteDTO } from '../_dto/agenteDTO';
import { AskEstadoExtension } from '../_model/askEstadoExtension';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private menuCambio = new Subject<Menu[]>();
  private usuarioCambio = new BehaviorSubject<string> ('DEFAULT');
  private extensionCambio = new BehaviorSubject<number> ( 0 )
  private ultimoCambio = new Subject<Date>();


  agenteDTO!: AgenteDTO;
  agenteASK!: AskEstadoExtension;


  private url: string = `${environment.HOST}/oauth/token`

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

    cerrarLogin(usuario: string){
    //const headers = { headers: new HttpHeaders({ 'content-type': "application/json" }) };  
    const body=JSON.stringify(usuario);
    return this.http.post<any>(`${this.url}`, body);
  }


  login(usuario: string, contrasena: string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }



  getMenuCambio() {
    return this.menuCambio.asObservable();
  }

  setMenuCambio(menus: Menu[]) {
    this.menuCambio.next(menus);
  }




  //captura el usuario de logueo


   getUsuariosCambio() {
    return this.usuarioCambio.asObservable();
  }

  setUsuariosCambio(usuario: string) {
    this.usuarioCambio.next(usuario);
  }

    //captura la extension de logueo


    getExtensionCambio() {
      return this.extensionCambio.asObservable();
    }
  
    setExtensionCambio(extension: number) {
      this.extensionCambio.next(extension);
    }
  
    

  estaLogueado(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  cerrarSesion(){
    
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    if(token){
      this.http.get(`${environment.HOST}/tokens/anular/${token}`).subscribe(() => {
        sessionStorage.clear();
        this.router.navigate(['login']);
      });
    }else{
      sessionStorage.clear();
      this.router.navigate(['login']);
    }    
  }

  enviarCorreo(correo: string){
    return this.http.post<number>(`${environment.HOST}/login/enviarCorreo`, correo, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  verificarTokenReset(token: string) {  
    return this.http.get<number>(`${environment.HOST}/login/restablecer/verificar/${token}`);
  }

  restablecer(token: string, clave: string) {
    return this.http.post(`${environment.HOST}/login/restablecer/${token}`, clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }


  ///////GET, SET //////

  getUltimoCambio() {
    return this.ultimoCambio.asObservable();
  }

  setUltimoCambio(hora: Date) {
    this.ultimoCambio.next(hora);
  }






  /*
  POST /oauth/token HTTP/1.1
  Host: localhost:8080
  Authorization: Basic bWl0b21lZGlhcHA6bWl0bzg5Y29kZXg=
  Content-Type: application/x-www-form-urlencoded

  grant_type=password&username=mitotest21@gmail.com&password=123*/
}
