import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/_model/cliente';
import { Empresa } from 'src/app/_model/empresa';
import { Usuario } from 'src/app/_model/usuario';
import { ClienteService } from 'src/app/_services/cliente.service';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { UsuarioService } from 'src/app/_services/usuario.service';


@Component({
  selector: 'app-cambiar-empresa',
  templateUrl: './cambiar-empresa.component.html',
  styleUrls: ['./cambiar-empresa.component.css']
})
export class CambiarEmpresaComponent implements  OnInit {

  usuario !: string;
  empresas !: Empresa[];
  empresaId !: Empresa;
  selectEmpresa !: number;

  displayedColumns: string[] = ['usuario','primerNombre','primerApellido','empresa.descripcion',
  'adicional', 'acciones'];
  dataSource !: MatTableDataSource<Usuario>;
  filtroEntranteDTO  = { loginAgente : this.usuario, idEmpresa : this.selectEmpresa  }

  constructor(
    
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService
  ){

  }
  ngOnInit(): void {

  this.empresaService.getMensajeCambio().subscribe(data =>{
    console.log('Hola Mundo');
  })
    
  }

  buscarAgente(){
      this.filtroEntranteDTO  = { loginAgente : this.usuario, idEmpresa : this.selectEmpresa }
      this.usuarioService.buscar(this.filtroEntranteDTO).subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);    
      })

      this.empresaService.listar().subscribe(data =>{
        this.empresas=data;
      });        
    }

  actualizar(){
    this.filtroEntranteDTO  = { loginAgente : this.usuario, idEmpresa : this.selectEmpresa }

    console.log(this.filtroEntranteDTO,'hOLA')
  
    this.empresaService.modificarEmp(this.filtroEntranteDTO).subscribe(()=>{
      this.usuarioService.buscar(this.filtroEntranteDTO).subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);    
        })      
      this.empresaService.setMensajecambio('SE MODIFICÓ');
    });
  }

}
