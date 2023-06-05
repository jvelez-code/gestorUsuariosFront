import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-not403',
  templateUrl: './not403.component.html',
  styleUrls: ['./not403.component.css']
})
export class Not403Component implements OnInit {

  usuario!: string;
  token: any;

  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit() {
   this.token = sessionStorage.getItem(environment.TOKEN_NAME);
   //geenra error raro no sigue despues de esa linea
   //const decodedTokens = helper.decodeToken('token');
   const decodedToken = this.jwtHelper.decodeToken(this.token);
   this.usuario = decodedToken.user_name;
  }

}
