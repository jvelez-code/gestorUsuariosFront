import { Component, OnInit } from '@angular/core';
import { ParametrosDTO } from 'src/app/_dto/ParametrosDTO';
import { MonitoreoService } from 'src/app/_services/monitoreo.service';

@Component({
  selector: 'app-monitoreo',
  standalone: true,
  imports: [],
  templateUrl: './monitoreo.component.html',
  styleUrl: './monitoreo.component.css'
})
export class MonitoreoComponent implements OnInit {

  parametrosDTO!: ParametrosDTO;

  constructor( private monitoreoService : MonitoreoService){

  }


  ngOnInit(): void {

    this.parametrosDTO = { empresa :'CONTACT'}

    this.monitoreoService.monitoreoEmpresa(this.parametrosDTO).subscribe(data => {
      console.log(data, 'Monitoreo OK')
    })
  }

}
