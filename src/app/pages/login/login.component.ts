import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
   
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    
  }
  
  ngAfterViewInit() {
    (window as any).initialize();
  }


}
