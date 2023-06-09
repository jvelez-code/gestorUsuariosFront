import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { MenuService } from './menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Menu } from '../_model/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService  {

  private usuarios !: string;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //1) VERIFICAR SI ESTA LOGUEADO
    let rpta = this.loginService.estaLogueado();
    if (!rpta) {
      this.loginService.cerrarSesion();
      return false;
    } else {
      //2) VERIFICAR SI EL TOKEN NO HA EXPIRADO
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      if (!helper.isTokenExpired(token)) {
        //3) VERIFICAR SI TIENES EL ROL NECESARIO PARA ACCEDER A ESA PAGINA  

        //url -> /consulta
        let url = state.url;
        this.loginService.getUsuariosCambio().subscribe((data:any) =>{
          this.usuarios=data;
        });

        //const decodedToken = helper.decodeToken(token: Promise<string>);

        return this.menuService.listarPorUsuario(this.usuarios).pipe(map( (data: Menu[]) => {

          this.loginService.setMenuCambio(data);

          let cont = 0;
          for (let m of data) {
            if (url.startsWith(m.url)) {
              cont++;
              break;
            }
          }

          if (cont > 0) {
            return true;
          } else {
            this.router.navigate(['not-403']);
            return false;
          }
          
        }));
        
      }else{
        this.loginService.cerrarSesion();
        return false;
      }
    }
    
    
  }
}
