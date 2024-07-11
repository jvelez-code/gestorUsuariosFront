import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not403',
    templateUrl: './not403.component.html',
    styleUrls: ['./not403.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class Not403Component {

  usuario!: string;

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    if (token){
      const decodedToken = helper.decodeToken(token);
      this.usuario = decodedToken.user_name;
    }   
    
  }
}
