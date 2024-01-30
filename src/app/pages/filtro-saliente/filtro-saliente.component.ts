import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteService } from 'src/app/_services/cliente.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-filtro-saliente',
  templateUrl: './filtro-saliente.component.html',
  styleUrls: ['./filtro-saliente.component.css']
})
export class FiltroSalienteComponent implements OnInit, OnDestroy {

  usuarios    !: string;
  idCliente   !: string;
  cardManual  !: boolean;
  formBuscar  !: FormGroup;
  clienteSubscription!: Subscription; 

  constructor(
    private loginService: LoginService,
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.loginService.getUsuariosCambio().subscribe((data: any) => {
      this.usuarios = data;
    });

  }




  buscarCliente() {
    const parametrosDTO = { tipoDoc: 'CC' , nroDocumento: '8080' }
    console.log(parametrosDTO,'1')

    this.clienteSubscription = this.clienteService.filtroCliente(parametrosDTO).subscribe(data => {

      console.log(data,'2')

      if (data) {
        this.idCliente = data.idCliente;
        this.clienteService.setIdClienteCambio(this.idCliente);

        this.router.navigate(['gestionSaliente']);
        console.log(data,'3')
      } else {
        console.log(data,'4')

        // this.clienteService.getDocumentoNuevo().subscribe(data=>{
        //   console.log(this.formCliente.value['identificacion'],1);

        //   console.log(data,2)

        // });

        this.router.navigate(['clientes']);
      }
    });
  }



  ngOnDestroy(): void {
    if(this.clienteSubscription){
      this.clienteSubscription.unsubscribe();
    }
  }

}
