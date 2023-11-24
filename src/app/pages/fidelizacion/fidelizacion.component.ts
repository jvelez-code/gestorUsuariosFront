import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { FidelizacionComercial } from 'src/app/_model/fidelizacionComercial';
import { FidelizacionService } from 'src/app/_services/fidelizacion.service';

@Component({
  selector: 'app-fidelizacion',
  templateUrl: './fidelizacion.component.html',
  styleUrls: ['./fidelizacion.component.css']
})
export class FidelizacionComponent  {

  parametrosDTO !: ParametrosDTO;



  displayedColumns = ['idFidelizacion', 'numeroPlanilla','idCliente.razonSocial','idUsuario.usuario','sucursal','codCaja','observacion','fechaGestion', 'acciones'];
  dataSource !: MatTableDataSource<FidelizacionComercial> 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cantidad: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private fidelizacionService : FidelizacionService  ) { }

  buscar(){
    this.parametrosDTO  = { fechaInicial : '2023-10-03 05:05:05', fechaFinal : '2023-12-04 05:05:05'  }
    this.fidelizacionService.buscar(this.parametrosDTO).subscribe(data =>{
      console.log(data)
      this.dataSource = new MatTableDataSource(data);  
    })

  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  mostrarMas(e: any) {

    console.log('Hola Mundo-1')
  }


  eliminar(idFidelizacion: number) {
    
    this.fidelizacionService.eliminar(idFidelizacion).subscribe(data =>{
      console.log('Hola Mundo')

    });

  }



}
