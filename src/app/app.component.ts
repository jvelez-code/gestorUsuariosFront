import { Component } from '@angular/core';
import { Menu } from './_model/menu';
import { LoginService } from './_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestorUsuarioFront';
  
  menus!: Menu[];

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit() {
  }
}
