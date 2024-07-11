import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription, switchMap } from 'rxjs';
import { GestionComercialDto } from 'src/app/_dto/GestionComercialDto';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { CicloVida } from 'src/app/_model/cicloVida';
import { CicloVidaService } from 'src/app/_services/ciclo-vida.service';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-ciclo-vida',
    templateUrl: './ciclo-vida.component.html',
    styleUrls: ['./ciclo-vida.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatFormField, MatSelect, MatOption, MatDivider, MatCardActions, MatButton, AsyncPipe]
})
export class CicloVidaComponent implements OnInit, OnDestroy {

  cicloVida !: CicloVida
  idCiclo !:number;
  idGestionCOmercial !:number;
  cicloVida$ !: Observable<CicloVida[]>;
  parametrosDTO !: ParametrosDTO
  subscription !: Subscription;
  @Input() fechaInicio!: String;
  @Input() fechaFin!: String;

  constructor(
    private cicloVidaService : CicloVidaService,
    private snackBar: MatSnackBar ,
    private dialogRef: MatDialogRef<CicloVidaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: GestionComercialDto,
  ){
    
  }

  ngOnInit(): void {
    this.cicloVida$= this.cicloVidaService.listar();
  }


  guardar(){

    this.parametrosDTO ={ idDetalleComer: this.data.idDetalleGestionComercial, cicloVida: this.idCiclo }

    this.cicloVidaService.modificarCiclo(this.parametrosDTO).subscribe(data =>{
      this.snackBar.open("SE REGISTRO", "Aviso", { duration: 2000 });

    })

    this.cicloVida = new CicloVida
    this.cicloVida.idCiclo = this.idCiclo
    this.cerrar();

  }

  cerrar(){
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
}
