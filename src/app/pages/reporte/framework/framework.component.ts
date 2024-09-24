import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { LoginService } from 'src/app/_services/login.service';
import { EmpresaService } from 'src/app/_services/empresa.service';

@Component({
    selector: 'app-framework',
    templateUrl: './framework.component.html',
    styleUrls: ['./framework.component.scss'],
    standalone: true,
    imports: [MatToolbar, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatList, MatListItem]
})
export class FrameworkComponent implements OnInit {


  campaignOne!: UntypedFormGroup;
  campaignTwo!: UntypedFormGroup;
  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  form!: UntypedFormGroup;
  agenteDTO !: AgenteDTO;
  empresaparametro !:  string;

  constructor(
    private loginService: LoginService,
    private empresaService: EmpresaService
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new UntypedFormGroup({
      start: new UntypedFormControl(new Date(year, month, 13)),
      end: new UntypedFormControl(new Date(year, month, 16)),

    });

      this.campaignTwo = new UntypedFormGroup({
        start: new UntypedFormControl(new Date(year, month, 15)),
        end: new UntypedFormControl(new Date(year, month, 19)),
      });

  }
   

  ngOnInit(): void {
    //private empresaService: EmpresaService
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });
  }

}
