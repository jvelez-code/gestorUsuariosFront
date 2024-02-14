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



    console.log(this.agenteDTO.idCampanaS,'CAMPA');
    console.log(this.agenteDTO.idUsuario,'USUARIO');
    const parametrosDTO = { tipoDoc: 'CC' , nroDocumento: '8080', campanaSal: '2638' }
    console.log(parametrosDTO,'1')

    console.log(this.idGestion,'idgestion filtro1')

    this.gestionService.buscarGestionSaliente(parametrosDTO).subscribe(data =>{
      
      console.log(data,'1');
      if (data) {

        console.log(data.idGestion,'2')
        
          this.idCliente =  data.idCliente ; //de numero a texto interpolacion
        
        
        this.clienteService.setIdClienteCambio(this.idCliente);

        this.idGestion = data.idGestion
        console.log(this.idGestion,'idgestionfiltro filtro1')
        if(this.idGestion !== undefined){
          console.log(this.idGestion,'idgestionfiltro filtro2')
          this.gestionService.setIdGestionSaliente(this.idGestion)
        }
        

        this.router.navigate(['gestionSaliente']);
        console.log(data,'3')
      } else {
        console.log(data,'4')
        this.router.navigate(['clientes']);
      }

    })

    // this.clienteSubscription = this.clienteService.filtroCliente(parametrosDTO).subscribe(data => {

    //   console.log(data,'2')

    //   if (data) {
    //     this.idCliente = '1837242' //data.idCliente;
    //     this.clienteService.setIdClienteCambio(this.idCliente);

    //     this.router.navigate(['gestionSaliente']);
    //     console.log(data,'3')
    //   } else {
    //     console.log(data,'4')

    //     // this.clienteService.getDocumentoNuevo().subscribe(data=>{
    //     //   console.log(this.formCliente.value['identificacion'],1);

    //     //   console.log(data,2)

    //     // });

    //     this.router.navigate(['clientes']);
    //   }
    // });
  }



  ngOnDestroy(): void {
    if(this.clienteSubscription){
      this.clienteSubscription.unsubscribe();
    }
  }

}
