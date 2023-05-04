import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AskEstado } from 'src/app/_model/askEstado';
import { AskEstadoService } from 'src/app/_services/ask-estado.service';



@Component({
  selector: 'app-extado-ext',
  templateUrl: './extado-ext.component.html',
  styleUrls: ['./extado-ext.component.css']
})
export class ExtadoExtComponent implements OnInit {

  estadoExt !:number;
  
  askEstados$ !: Observable<AskEstado[]>;

  constructor (
    private askEstadoService: AskEstadoService,
    private router: Router,
    private snackBar: MatSnackBar
  )
  {}



  ngOnInit(): void {
   /* this.askEstadoService.buscar().subscribe(data=>{
      console.log(data);
    });*/
    this.askEstados$=this.askEstadoService.buscar();
  }
  
  cambioExt(){
    console.log('cambio Ext', this.estadoExt);
  }
}
