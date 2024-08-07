import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { FidelizacionComercial } from 'src/app/_model/fidelizacionComercial';
import { FidelizacionService } from 'src/app/_services/fidelizacion.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-fidelizacion',
    templateUrl: './fidelizacion.component.html',
    styleUrls: ['./fidelizacion.component.scss'],
    standalone: true,
    imports: [RouterOutlet, ReactiveFormsModule, FormsModule, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatError, MatCardActions, MatButton, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class FidelizacionComponent   implements OnInit {

  parametrosDTO !: ParametrosDTO;
  fechaparametro1 !:  string;
  fechaparametro2 !:  string;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  displayedColumns = ['idFidelizacion', 'numeroPlanilla','idCliente.razonSocial','idUsuario.usuario','sucursal','codCaja','observacion','fechaGestion', 'acciones'];
  dataSource !: MatTableDataSource<FidelizacionComercial> 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cantidad: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private fidelizacionService : FidelizacionService  ) { }

    ngOnInit(): void {

        this.fidelizacionService.getFidelizacionCambio().subscribe(data =>{
          this.dataSource = new MatTableDataSource(data);  
        })
        this.fidelizacionService.getMensajeCambio().subscribe(data =>{
          this.snackBar.open(data, 'AVISO', { duration : 2000 } )
        });
    
    
    }

  buscar(){
    this.fechaparametro1 = moment(this.range.value.start).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.range.value.end).format('YYYY-MM-DD 23:59:59');

    this.parametrosDTO  = { fechaInicial :  this.fechaparametro1, fechaFinal : this.fechaparametro2  }
    this.fidelizacionService.buscar(this.parametrosDTO).subscribe(data =>{
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
    
    this.fidelizacionService.eliminar(idFidelizacion).pipe(switchMap(() =>{
      return this.fidelizacionService.buscar(this.parametrosDTO)
    })).subscribe(data =>{
      
      this.fidelizacionService.setFidelizacionCambio(data);
      this.fidelizacionService.setMensajecambio('SE ELIMINÓ')
      

    })
  }



}
