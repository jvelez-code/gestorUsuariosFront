import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatListModule, MatListOption, MatSelectionList } from '@angular/material/list';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { Campana } from 'src/app/_model/campana';
import { Usuario } from 'src/app/_model/usuario';
import { CampanaService } from 'src/app/_services/campana.service';
import { LoginService } from 'src/app/_services/login.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { ValidadoresService } from 'src/app/_services/validadores.service';

@Component({
  selector: 'app-asignar-campana',
  standalone: true,
  imports: [ 
     MatCard,
     MatCardHeader,
     MatCardTitle, MatCardSubtitle,
     MatCardContent,
     MatFormField, MatLabel,
     MatInput, ReactiveFormsModule,
     FormsModule, MatCardActions,
     MatButton, MatTable,
     MatColumnDef, MatHeaderCellDef,
     MatHeaderCell, MatCellDef,
     MatCell, MatSelect,
     MatOption, MatIcon,
     MatHeaderRowDef, MatHeaderRow,
     MatRowDef, MatRow,
     MatListModule,
     MatListOption,
     AsyncPipe,
     CommonModule
    ],
  templateUrl: './asignar-campana.component.html',
  styleUrl: './asignar-campana.component.scss'
})
export class AsignarCampanaComponent implements OnInit {


  formAsignar!: FormGroup;


  tipoCampana : number = 3 ;
  tipoCampana2 !: number;
  parametroDTO!: ParametrosDTO;
  agenteDTO!: AgenteDTO;
  usuarios$ !: Observable <Usuario[]>;
  form!: FormGroup;
  idAgente !: number;
  select : boolean = true;

  campanas$ !: Observable <Campana[]>;
  idEmpresa !: number;
  idCampana !: number;
  idSeleccionado : number[]=[];

  ngOnInit(): void {

    this.agenteDTO = this.loginService.agenteDTO;
    this.idEmpresa = this.agenteDTO.idEmpresa ?? 0;
    
    this.parametroDTO = {idEmpresa:1 }
    this.usuarios$ = this.usuarioService.buscarAsignaciones(this.parametroDTO);
  }

  constructor(
    private usuarioService: UsuarioService,
    private campanaService: CampanaService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private validadoresService: ValidadoresService,
  ){ 
    this.crearFormulario();
  }

  crearFormulario(){

    this.formAsignar = this.fb.group({
      'tipoCampana': ['', [Validators.required]],
      'idCampana': ['', [Validators.required]],
      'idSeleccionado': ['', [Validators.required]],
    });


  }





campanasTipo(idTipoCampana: number) {
  this.parametroDTO ={ idEmpresa: this.idEmpresa, idTipoCampana: idTipoCampana }
  this.campanas$= this.campanaService.listarAsignacion(this.parametroDTO);
}

selectAll(selectionList: MatSelectionList): void {
  selectionList.options.forEach(option => option.selected = this.select)
  this.select = !this.select
}

guardarSelec(selectedOptions: MatListOption[]){
  this.idSeleccionado = selectedOptions.map(option => option.value);
  this.formAsignar.patchValue({ idSeleccionado: this.idSeleccionado });
    console.log(this.idSeleccionado); 
}

guardar(){
  console.log('holasss')

}



}
