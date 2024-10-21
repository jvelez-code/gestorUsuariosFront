import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { AskEstadoExtension } from 'src/app/_model/askEstadoExtension';
import { MonitoreoService } from 'src/app/_services/monitoreo.service';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { LoginService } from 'src/app/_services/login.service';
import { AskEstadoExtService } from 'src/app/_serviceRepo/ask-estado-ext.service';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { LoadingComponent } from './loading/loading.component';


@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreos.component.html',
  styleUrls: ['./monitoreos.component.scss'],
  standalone: true,
  imports: [MatButtonToggleModule,
      MatToolbar,
      MatToolbarRow,
      MatCard,
      MatCardContent,
      MatFormField,
      MatLabel,
      MatInput,
      MatSlideToggle,
      ReactiveFormsModule,
      FormsModule,
      NgIf,
      NgFor,
      MatColumnDef,
      NgClass,
      MatIconButton,
      MatIcon,
      MatTable,
      MatSort,
      MatHeaderCellDef,
      MatHeaderCell,
      MatSortHeader,
      MatCellDef,
      MatCell,
      MatButton,
      MatHeaderRowDef,
      MatHeaderRow,
      MatRowDef,
      MatRow,
      MatPaginator,
      DatePipe,
      CommonModule,
      LoadingComponent
      
  ],
})

export class MonitoreosComponent implements OnInit, OnDestroy {

  parametrosDTO!: ParametrosDTO;
  empresaparametro !:  string;
  loading !: boolean;
  favoritePie = 'Mosaico';
  pieOptions = ['Mosaico', 'Lista'];



  private subscripcion : Subscription = new Subscription();
  displayedColumns = ['serial','extension', 'login', 'fecha','descripcion','numero_origen','total', 'cerrar'];
  dataSource !: MatTableDataSource<AskEstadoExtension>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
        private monitoreoService : MonitoreoService,
        private loginService : LoginService,
        private askEstadoExtService : AskEstadoExtService,
        private empresaService: EmpresaService
      )
  {

    this.loading=true;
  }


  ngOnInit(): void {
    //private empresaService: EmpresaService
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    });
  


    this.parametrosDTO = { empresa : this.empresaparametro}


    const actualizar = interval(3000)
    this.subscripcion= actualizar.subscribe(n=>{

    this.monitoreoService.monitoreoEmpresa(this.parametrosDTO).subscribe(data => {
      this.dataSource= new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.loading=false;
    })
  })
  }
    
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
   }
 
 
   filtro(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 

   askEstadoMonitoreo(extension: number ){

    let parametrosDTO ={ idExtension: extension }
    this.askEstadoExtService.actuAskEstados(parametrosDTO).subscribe(data =>{
  
    });
  
   }

    

}

