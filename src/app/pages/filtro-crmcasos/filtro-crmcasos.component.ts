import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoDocumento } from 'src/app/_model/tipoDocumento';
import { ClienteService } from 'src/app/_services/cliente.service';
import { TipoDocumentoService } from 'src/app/_services/tipo-documento.service';

@Component({
    selector: 'app-filtro-crmcasos',
    imports: [RouterOutlet,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatCardActions,
        MatButton,
        MatSelect,
        MatOption,
        MatIcon,
        AsyncPipe],
    templateUrl: './filtro-crmcasos.component.html',
    styleUrl: './filtro-crmcasos.component.scss'
})
export class FiltroCrmcasosComponent implements OnInit {

  formBuscar!: FormGroup;
  tipoDocumento: string = 'CC';
  nroDocumento  !: string;
  tipoDocumento$ !: Observable<TipoDocumento[]>;
  idCliente   !: any;

  constructor( 
    private tipoDocumentoService: TipoDocumentoService,
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar)
    {
      this.crearFormulario();
    }

  ngOnInit(): void {
    this.tipoDocumento$ = this.tipoDocumentoService.buscar();
  }


  crearFormulario(){

    this.formBuscar = new FormGroup({
      'nroDocumento': new FormControl('')
    });
    
  }

  buscarCliente() {
    const parametrosDTO = { tipoDoc: this.tipoDocumento, nroDocumento: this.formBuscar.value['nroDocumento'] }

    this.clienteService.filtroCliente(parametrosDTO).subscribe(data => {
      if (data && data.length > 0) {
        this.clienteService.setClienteCambio(data);       
        this.idCliente = data[0].idCliente;
        this.clienteService.setIdClienteCambio(this.idCliente)
        this.router.navigate(['crmCuentas']);
      } else {
      }
    });
    this.prueba();
  }
  


prueba(){
  
  this.clienteService.getClienteCambio().subscribe(data =>{
  })
}
}