import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/_services/login.service';
import { MenuService } from 'src/app/_services/menu.service';
import { environment } from 'src/environments/environment';
import '../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario!: string;
  clave!: string;
  mensaje!: string;
  error!: string;
  loginAgente!: string;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data =>{
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      const helper = new JwtHelperService();

      let decodedToken = helper.decodeToken(data.access_token);
      this.loginService.setUsuariosCambio(decodedToken.user_name);

      

      this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data=>{
        this.loginService.setMenuCambio(data);
        this.router.navigate(['estadoExtension']);
      });
      
    });

  }

  ngAfterViewInit() {
    (window as any).initialize();
  }
}
