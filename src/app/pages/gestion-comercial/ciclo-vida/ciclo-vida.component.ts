import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Observable, Subscription, switchMap } from 'rxjs';
import { GestionComercialDto } from 'src/app/_dto/GestionComercialDto';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { CicloVida } from 'src/app/_model/cicloVida';
import { CicloVidaService } from 'src/app/_services/ciclo-vida.service';

@Component({
  selector: 'app-ciclo-vida',
  templateUrl: './ciclo-vida.component.html',
  styleUrls: ['./ciclo-vida.component.css']
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
    private dialogRef: MatDialogRef<CicloVidaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: GestionComercialDto,
  ){
    console.log(data)
  }

  ngOnInit(): void {
    this.cicloVida$= this.cicloVidaService.listar();
  }


  guardar(){

    this.parametrosDTO ={ idDetalleComer: this.data.idDetalleGestionComercial, cicloVida: this.idCiclo }

    this.cicloVidaService.modificarCiclo(this.parametrosDTO).subscribe(data =>{

    })


    // this.fidelizacionService.eliminar(idFidelizacion).pipe(switchMap(() =>{
    //   return this.fidelizacionService.buscar(this.parametrosDTO)
    // })).subscribe(data =>{
    //   console.log(data,'2')
    //   this.fidelizacionService.setFidelizacionCambio(data);
    //   this.fidelizacionService.setMensajecambio('SE ELIMINÓ')


    console.log('PRUBASCV', this.data.idDetalleGestionComercial)

    this.cicloVida = new CicloVida
    this.cicloVida.idCiclo = this.idCiclo
    console.log('CICLO',this.cicloVida)

    this.cerrar();

  }

  cerrar(){
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
}
