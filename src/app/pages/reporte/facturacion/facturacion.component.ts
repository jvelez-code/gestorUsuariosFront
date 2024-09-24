import { Component, OnInit } from '@angular/core';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
    selector: 'app-facturacion',
    templateUrl: './facturacion.component.html',
    styleUrls: ['./facturacion.component.scss'],
    standalone: true
})
export class FacturacionComponent implements OnInit {

  agenteDTO !: AgenteDTO;
  empresaparametro !:  string;

  constructor( 
    private loginService: LoginService,
    private empresaService: EmpresaService
  ) {      
  }

  ngOnInit(): void {
    //private empresaService: EmpresaService
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });
  }

}
