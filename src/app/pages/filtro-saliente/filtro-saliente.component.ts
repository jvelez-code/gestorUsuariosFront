import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { ClienteService } from 'src/app/_services/cliente.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { LoginService } from 'src/app/_services/login.service';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-filtro-saliente',
    templateUrl: './filtro-saliente.component.html',
    styleUrls: ['./filtro-saliente.component.scss'],
    imports: [RouterOutlet, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatButton]
})
export class FiltroSalienteComponent implements OnInit, OnDestroy {

  usuarios    !: string;
  cardManual  !: boolean;
  formBuscar  !: FormGroup;
  clienteSubscription!: Subscription;
  agenteDTO !: AgenteDTO;
  idGestion  !: number | undefined;
  idCliente  !: number;
  habilitaG: boolean = false;

  constructor(
    private loginService: LoginService,
    private clienteService: ClienteService,
    private gestionService: GestionService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {

    this.agenteDTO = this.loginService.agenteDTO;

    this.clienteService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    })
  }




  buscarCliente() {

    this.habilitaG = true;



    const parametrosDTO = { tipoDoc: 'CC', nroDocumento: '8080', campanaSal: this.agenteDTO.idCampanaS }

    this.gestionService.buscarGestionSaliente(parametrosDTO).subscribe(data => {
      
      if (data.idCliente != null) {

        this.idCliente = data.idCliente; //de numero a texto interpolacion


        this.clienteService.setIdClienteCambio(this.idCliente);

        this.idGestion = data.idGestion
              if (this.idGestion) {
                this.gestionService.setIdGestionSaliente(this.idGestion)
              } 
              this.router.navigate(['gestionSaliente']);

      } else {

        this.clienteService.setMensajecambio('SE TERMINO CAMPAÑA');
      }

    })


  }



  ngOnDestroy(): void {
    if (this.clienteSubscription) {
      this.clienteSubscription.unsubscribe();
    }
  }

}
