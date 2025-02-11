import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import * as moment from 'moment';
import { DetalleGestion } from 'src/app/_model/detalleGestion';
import { Parametros } from 'src/app/_model/parametros';
import { ReporteService } from 'src/app/_serviceRepo/reporte.service';
import { LoginService } from 'src/app/_services/login.service';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { EmpresaService } from 'src/app/_services/empresa.service';


@Component({
    selector: 'app-filtrado-secretaria',
    templateUrl: './filtrado-secretaria.component.html',
    styleUrls: ['./filtrado-secretaria.component.scss'],
    imports: [MatToolbar, RouterOutlet, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatFormField, MatLabel, MatDateRangeInput, ReactiveFormsModule, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, FormsModule, MatInput, MatButton]
})
export class FiltradoSecretariaComponent {



  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  empresaparametro !:  string;

  form!: FormGroup;
  reporteName : string ="FILTRAR DEVOLUCIONES "

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  mensaje !: string;
  detalleGestion !: DetalleGestion[];
  parametros !: Parametros;
  fechaInicios !: any;
  fechaFins !: any;
  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
  regDevolver : number = 0;
  regPendientes : number = 0;
  agenteDTO !: AgenteDTO;
  

  constructor( private reporteService : ReporteService, 
               private route: ActivatedRoute,
               private loginService: LoginService,
               private empresaService: EmpresaService,
               private router: Router) 
               { 
                const today = new Date();
                const month = today.getMonth();
                const year = today.getFullYear();
            
                this.campaignOne = new FormGroup({
                  start: new FormControl(new Date(year, month, 13)),
                  end: new FormControl(new Date(year, month, 16)),

                });

                  this.campaignTwo = new FormGroup({
                    start: new FormControl(new Date(year, month, 15)),
                    end: new FormControl(new Date(year, month, 19)),
                  });
               }
               
  
               ngOnInit(): void {
                //private empresaService: EmpresaService
                this.empresaService.getEmpresaCambio().subscribe(data =>{
                  this.empresaparametro= data;
                });
              }
            

    aceptar(){    
      this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
      this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');
   
      const parametros= { fechaini:this.fechaparametro1, fechafin:this.fechaparametro2,
                          empresa:this.empresaparametro }
     //parametros son los paramatros que enviamos y node.js los toma en el header
     
      this.reporteService.reporfiltradosSecretaria(parametros).subscribe(data=>{
        console.log(data[0].devolucion,'HOLA')
        this.regDevolver= data[0].devolucion;
        this.regPendientes= data[0].intento;
        
  
    }); 
  }
  
}
