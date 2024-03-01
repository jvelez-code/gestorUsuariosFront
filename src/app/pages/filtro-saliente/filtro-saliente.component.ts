import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { ClienteService } from 'src/app/_services/cliente.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-filtro-saliente',
  templateUrl: './filtro-saliente.component.html',
  styleUrls: ['./filtro-saliente.component.css']
})
export class FiltroSalienteComponent implements OnInit, OnDestroy {

  usuarios    !: string;
  cardManual  !: boolean;
  formBuscar  !: FormGroup;
  clienteSubscription!: Subscription; 
  agenteDTO !:AgenteDTO;
  idGestion  !: number | undefined;
  idCliente  !: string ;

  constructor(
    private loginService: LoginService,
    private clienteService: ClienteService,
    private gestionService: GestionService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
   
    this.agenteDTO = this.loginService.agenteDTO;

    
  }




  buscarCliente() {

    const parametrosDTO = { tipoDoc: 'CC' , nroDocumento: '8080', campanaSal: '2638' }
    this.gestionService.buscarGestionSaliente(parametrosDTO).subscribe(data =>{
      
      if (data) {

        this.idCliente =  data.idCliente ; //de numero a texto interpolacion
        
        
        this.clienteService.setIdClienteCambio(this.idCliente);

        this.idGestion = data.idGestion
      
        if(this.idGestion !== undefined){
      
          this.gestionService.setIdGestionSaliente(this.idGestion)
        }
        

        this.router.navigate(['gestionSaliente']);
      
      } else {
      
        this.router.navigate(['clientes']);
      }

    })

    
  }



  ngOnDestroy(): void {
    if(this.clienteSubscription){
      this.clienteSubscription.unsubscribe();
    }
  }

}
