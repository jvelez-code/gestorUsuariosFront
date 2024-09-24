import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit {

  public nombre !: string;
  public apellido !: string;
  public empresa !: string;

  constructor( 
    private loginService: LoginService,
  )
  {
  }

  ngOnInit(): void {
    this.initAgenteDTO();
  }


  initAgenteDTO(): void {
    const agenteDTO = this.loginService.agenteDTO;
    this.nombre = agenteDTO.primerNombre ?? '';
    this.apellido = agenteDTO.primerApellido ?? '';
    this.empresa = agenteDTO.pseudonimo ?? '';
}
}