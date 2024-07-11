import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Cliente } from 'src/app/_model/cliente';
import { Empresa } from 'src/app/_model/empresa';
import { Usuario } from 'src/app/_model/usuario';
import { ClienteService } from 'src/app/_services/cliente.service';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';


@Component({
    selector: 'app-cambiar-empresa',
    templateUrl: './cambiar-empresa.component.html',
    styleUrls: ['./cambiar-empresa.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatFormField, MatLabel, MatInput, ReactiveFormsModule, FormsModule, MatCardActions, MatButton, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatSelect, MatOption, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class CambiarEmpresaComponent implements  OnInit {

  usuario !: string;
  empresas !: Empresa[];
  empresaId !: Empresa;
  selectEmpresa !: number;

  displayedColumns: string[] = ['usuario','primerNombre','primerApellido','empresa.descripcion',
  'adicional', 'acciones'];
  dataSource !: MatTableDataSource<Usuario>;
  parametrosDTO  = { loginAgente : this.usuario, idEmpresa : this.selectEmpresa  }

  constructor(
    
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService
  ){

  }
  ngOnInit(): void {

  this.empresaService.getMensajeCambio().subscribe(data =>{
  })
    
  }

  buscarAgente(){
      this.parametrosDTO  = { loginAgente : this.usuario, idEmpresa : this.selectEmpresa }
      this.usuarioService.buscar(this.parametrosDTO).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);    
      })

      this.empresaService.listar().subscribe(data =>{
        this.empresas=data;
      });        
    }

  actualizar(){
    this.parametrosDTO  = { loginAgente : this.usuario, idEmpresa : this.selectEmpresa }
  
    this.empresaService.modificarEmp(this.parametrosDTO).subscribe(()=>{
      this.usuarioService.buscar(this.parametrosDTO).subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);    
        })      
      this.empresaService.setMensajecambio('SE MODIFICÓ');
    });
  }

}
