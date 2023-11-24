import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
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

  constructor(
    private cicloVidaService : CicloVidaService,
    @Inject(MAT_DIALOG_DATA) private data: GestionComercialDto,
  ){}

  ngOnInit(): void {
    this.cicloVida$= this.cicloVidaService.listar();
  }


  guardar(){

    this.parametrosDTO ={ idDetalleComer: this.data.idDetalleGestionComercial, cicloVida: this.idCiclo }
    this.cicloVidaService.modificarCiclo(this.parametrosDTO).subscribe(data =>{
      console.log(data,'pruebas zzz')
    })



    console.log('PRUBASCV', this.data.idDetalleGestionComercial)

    this.cicloVida = new CicloVida
    this.cicloVida.idCiclo = this.idCiclo
    console.log('CICLO',this.cicloVida)

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
}
