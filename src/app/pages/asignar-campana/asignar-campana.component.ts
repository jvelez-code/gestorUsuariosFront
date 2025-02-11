import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatListModule, MatListOption, MatSelectionList } from '@angular/material/list';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AgenteDTO } from 'src/app/_dto/agenteDTO';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { AgenteCampana } from 'src/app/_model/agenteCampana';
import { Campana } from 'src/app/_model/campana';
import { Usuario } from 'src/app/_model/usuario';
import { AgenteCampanaService } from 'src/app/_services/agente-campana.service';
import { CampanaService } from 'src/app/_services/campana.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { LoginService } from 'src/app/_services/login.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { ValidadoresService } from 'src/app/_services/validadores.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
    selector: 'app-asignar-campana',
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
        CommonModule,
        MatPaginator,
        MatPaginatorModule
    ],
    templateUrl: './asignar-campana.component.html',
    styleUrl: './asignar-campana.component.scss'
})
export class AsignarCampanaComponent implements OnInit {


  formAsignar!: FormGroup;


  tipoCampana : number = 3 ;
  parametroDTO!: ParametrosDTO;
  agenteDTO!: AgenteDTO;
  usuarios$ !: Observable <Usuario[]>;
  form!: FormGroup;
  idAgente !: number;
  select : boolean = true;
  cantidadGestion!: number;
  pendienteGestion!: number;

  campanas$ !: Observable <Campana[]>;
  idEmpresa !: number;
  idCampana !: number;
  idSeleccionado : number[]=[];

  displayedColumns: string[] = ['id', 'agente.usuario', 'agente.primerNombre', 'agente.primerApellido'];
  dataSource!: MatTableDataSource<AgenteCampana>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.agenteDTO = this.loginService.agenteDTO;
    this.idEmpresa = this.agenteDTO.idEmpresa ?? 0;
    
    this.parametroDTO = {idEmpresa:this.idEmpresa }
    this.usuarios$ = this.usuarioService.buscarAsignaciones(this.parametroDTO);
  }

  constructor(
    private usuarioService: UsuarioService,
    private campanaService: CampanaService,
    private loginService: LoginService,
    private agenteCampanaService: AgenteCampanaService,
    private gestionService: GestionService,
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

detalleCapana(campanaSal: number){
  this.parametroDTO ={ campanaSal: campanaSal }   
  this.gestionService.gestionCampana(this.parametroDTO).subscribe(data =>{
    this.cantidadGestion=data;
  });
  this.gestionService.gestionCampanaFal(this.parametroDTO).subscribe(data =>{
    this.pendienteGestion=data;
  });

  this.agenteCampanaService.validarAsignacion(this.parametroDTO).subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  });

}



selectAll(selectionList: MatSelectionList): void {
  selectionList.options.forEach(option => option.selected = this.select)
  this.select = !this.select
}

guardarSelec(selectedOptions: MatListOption[]){
  this.idSeleccionado = selectedOptions.map(option => option.value);
  this.formAsignar.patchValue({ idSeleccionado: this.idSeleccionado });
}

guardar(){
  this.parametroDTO ={idUsuarios: this.idSeleccionado, campanaSal:this.idCampana, idTipoCampana: this.tipoCampana }
  this.agenteCampanaService.asignarAgente(this.parametroDTO).subscribe(()=>{

  });


}



}
